import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// The lockfile has to work with any npm registry (Dependabot and CI use npmjs.org, some machines a
// company mirror) and pin every package with a hash that npm can check against npmjs.org.
interface LockedPackage {
	integrity?: string;
	resolved?: string;
	link?: boolean;
	inBundle?: boolean;
}
const lock: { packages: Record<string, LockedPackage> } = JSON.parse(
	readFileSync(fileURLToPath(new URL('../../package-lock.json', import.meta.url)), 'utf8'),
);
const packages = Object.entries(lock.packages).filter(([path, pkg]) => path !== '' && !pkg.link && !pkg.inBundle);

describe('package-lock.json', () => {
	it('pins every package with SHA-512', () => {
		const weak = packages.filter(([, pkg]) => !pkg.integrity?.startsWith('sha512-')).map(([path]) => path);
		expect(weak, 'run `npm run lockfile:sha512`').toEqual([]);
	});

	it('records no registry other than npmjs.org', () => {
		const foreign = packages
			.filter(([, pkg]) => pkg.resolved && !pkg.resolved.startsWith('https://registry.npmjs.org/'))
			.map(([path]) => path);
		expect(foreign, 'install with the repository .npmrc in place').toEqual([]);
	});
});
