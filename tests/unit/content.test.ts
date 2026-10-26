import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { steps } from '../../src/data/steps';
import { videos } from '../../src/data/videos';
import { ui } from '../../src/lib/i18n';

const docs = fileURLToPath(new URL('../../src/content/docs/', import.meta.url));

interface Page {
	/** Path below the locale root, e.g. `steps/prepare.mdx`. */
	slug: string;
	lang: 'en' | 'de';
	text: string;
	frontmatter: string;
}

function walk(dir: string, extension = '.mdx'): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
		entry.isDirectory() ? walk(join(dir, entry.name), extension) : entry.name.endsWith(extension) ? [join(dir, entry.name)] : []
	);
}

const pages: Page[] = walk(docs).map((file) => {
	const rel = relative(docs, file).split('\\').join('/');
	const lang = rel.startsWith('de/') ? 'de' : 'en';
	const text = readFileSync(file, 'utf8');
	return { slug: lang === 'de' ? rel.slice(3) : rel, lang, text, frontmatter: text.split('---')[1] ?? '' };
});
const english = pages.filter((p) => p.lang === 'en');
const german = pages.filter((p) => p.lang === 'de');
const field = (page: Page, name: string) => page.frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim();
const twin = (page: Page) => pages.find((p) => p.slug === page.slug && p.lang !== page.lang);

describe('pages', () => {
	it('exist in English and German with the same file names', () => {
		expect(german.map((p) => p.slug).sort()).toEqual(english.map((p) => p.slug).sort());
	});

	it.each(pages)('$lang/$slug has a title, a description and a valid "last checked" date', (page) => {
		expect(field(page, 'title')).toBeTruthy();
		expect(field(page, 'description')).toBeTruthy();
		const date = field(page, 'lastVerified');
		expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		// A real calendar date: YAML would silently turn 2026-10-00 or 2026-02-30 into another day.
		const parsed = new Date(`${date}T00:00:00Z`);
		expect(Number.isNaN(parsed.getTime()) ? 'invalid' : parsed.toISOString().slice(0, 10), `${date} is not a real date`).toBe(date);
		// Not in the future anywhere on Earth (UTC+14), so a date set "today" in Europe never fails at night.
		const latest = new Date(Date.now() + 14 * 3_600_000).toISOString().slice(0, 10);
		expect(date! <= latest, `${date} is in the future`).toBe(true);
	});

	it.each(english)('$slug was last checked on the same day in both languages', (page) => {
		expect(field(twin(page)!, 'lastVerified')).toBe(field(page, 'lastVerified'));
	});
});

describe('official documentation links', () => {
	const locales = { en: { github: 'en', microsoft: 'en-us' }, de: { github: 'de', microsoft: 'de-de' } };

	it.each(pages)('$lang/$slug links to docs in its own language', (page) => {
		// Any first path segment counts, so a link without a locale (…/enterprise-cloud@latest/…) fails too.
		for (const [, locale] of page.text.matchAll(/https:\/\/docs\.github\.com\/([^/\s)"'>]+)/g)) {
			expect(locale).toBe(locales[page.lang].github);
		}
		for (const [, locale] of page.text.matchAll(/https:\/\/learn\.microsoft\.com\/([^/\s)"'>]+)/g)) {
			expect(locale).toBe(locales[page.lang].microsoft);
		}
	});
});

const informal = /\b(du|dich|dir|dein|deine|deinen|deinem|deiner|deines)\b/gi;

describe('German style', () => {
	it.each(german)('$slug addresses the reader formally (Sie, not du)', (page) => {
		// Frontmatter included: titles, descriptions and the hero are the most visible text.
		expect(page.text.match(informal)).toBeNull();
	});

	it('UI strings and step data address the reader formally too', () => {
		const strings = [
			...Object.values(ui.de),
			...steps.flatMap((s) => [s.title.de, s.short.de, s.time.de, s.wait?.de ?? '', ...s.checks.map((c) => c.text.de)]),
			...Object.values(videos).map((v) => v.summary.de),
		];
		expect(strings.filter((text) => text.match(informal))).toEqual([]);
	});

	it('German text written into components addresses the reader formally', () => {
		// Scans the whole source; a code identifier such as `dir` would need renaming or a narrower check.
		const dir = fileURLToPath(new URL('../../src/components/', import.meta.url));
		const components = walk(dir, '.astro');
		expect(components.length).toBeGreaterThan(10);
		const offenders = components.filter((file) => readFileSync(file, 'utf8').match(informal));
		expect(offenders.map((file) => relative(dir, file))).toEqual([]);
	});
});

describe('step pages', () => {
	const stepPages = pages.filter((p) => p.slug.startsWith('steps/'));

	it('match the step list one to one', () => {
		const ids = steps.map((s) => s.id).sort();
		expect(english.filter((p) => p.slug.startsWith('steps/')).map((p) => p.slug.slice(6, -4)).sort()).toEqual(ids);
	});

	it.each(stepPages)('$lang/$slug shows its own step card and checkpoints', (page) => {
		const id = page.slug.slice(6, -4);
		const uses = (component: string) =>
			[...page.text.matchAll(new RegExp(`<${component}\\b[^>]*\\bstep="([^"]+)"`, 'g'))].map((m) => m[1]);
		expect(uses('StepIntro')).toEqual([id]);
		expect(uses('DoneWhen')).toEqual([id]);
	});
});

describe('videos in content', () => {
	it('only reference known videos', () => {
		const used = pages.flatMap((p) => [...p.text.matchAll(/<Video id="([^"]+)"/g)].map((m) => m[1]));
		expect(used.length).toBeGreaterThan(0);
		for (const id of used) expect(Object.keys(videos)).toContain(id);
	});
});
