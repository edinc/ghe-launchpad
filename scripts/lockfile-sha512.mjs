// Replaces SHA-1 integrity values in package-lock.json with SHA-512.
//
// Some npm mirrors only publish SHA-1 checksums, so installing through one records `sha1-` values.
// registry.npmjs.org publishes SHA-512, and npm only compares hashes of the same algorithm, so CI
// would never check those packages against the lockfile. This script asks npm for each affected
// package (through your own registry, cache and auth settings), confirms that the tarball matches
// the locked SHA-1 and records its SHA-512. The next `npm ci` in CI checks every SHA-512 against
// npmjs.org. tests/unit/lockfile.test.ts fails while a SHA-1 value is left.
//
// Usage: npm run lockfile:sha512

import { execFile } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { promisify } from 'node:util';

const run = promisify(execFile);
const file = 'package-lock.json';
const lock = JSON.parse(readFileSync(file, 'utf8'));

const weak = Object.entries(lock.packages)
	.filter(([path, pkg]) => path && pkg.integrity?.startsWith('sha1-'))
	.map(([path, pkg]) => ({ pkg, spec: `${pkg.name ?? path.slice(path.lastIndexOf('node_modules/') + 13)}@${pkg.version}` }));

if (weak.length === 0) {
	console.log('Every package is already pinned with SHA-512.');
	process.exit(0);
}

// `npm pack --dry-run --json <spec>` downloads the tarball and reports its SHA-1 (shasum) and SHA-512
// (integrity) without writing anything. One spec per call, eight at a time: npm 12 prints an object
// keyed by package name instead of an array, which would merge two versions of the same package.
const queue = [...new Set(weak.map((w) => w.spec))];
const packed = new Map();
await Promise.all(
	Array.from({ length: 8 }, async () => {
		for (let spec = queue.shift(); spec; spec = queue.shift()) {
			const { stdout } = await run('npm', ['pack', '--dry-run', '--json', '--prefer-offline', spec], {
				maxBuffer: 64 * 1024 * 1024,
				shell: process.platform === 'win32',
			});
			const output = JSON.parse(stdout);
			packed.set(spec, (Array.isArray(output) ? output : Object.values(output))[0]);
		}
	}),
);

for (const { pkg, spec } of weak) {
	const tarball = packed.get(spec);
	if (!tarball?.shasum || !tarball.integrity) throw new Error(`${spec}: npm pack didn't report its checksums.`);
	const sha1 = `sha1-${Buffer.from(tarball.shasum, 'hex').toString('base64')}`;
	if (sha1 !== pkg.integrity) throw new Error(`${spec}: the tarball's ${sha1} doesn't match the locked ${pkg.integrity}.`);
	pkg.integrity = tarball.integrity;
}

writeFileSync(file, `${JSON.stringify(lock, null, 2)}\n`);
console.log(`Pinned ${weak.length} packages with SHA-512.`);
