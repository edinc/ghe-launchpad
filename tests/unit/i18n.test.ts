import { describe, expect, it, vi } from 'vitest';
import { formatDate, getLang, href, t, ui } from '../../src/lib/i18n';

type AstroLike = Parameters<typeof getLang>[0];
const astro = (path: string, routeLang?: string) =>
	({
		locals: routeLang ? { starlightRoute: { lang: routeLang } } : {},
		url: new URL(`http://localhost${path}`),
	}) as unknown as AstroLike;

describe('getLang', () => {
	it('prefers the language of the Starlight route', () => {
		expect(getLang(astro('/ghe-launchpad/', 'de'))).toBe('de');
		expect(getLang(astro('/ghe-launchpad/', 'de-DE'))).toBe('de');
		expect(getLang(astro('/ghe-launchpad/de/', 'en'))).toBe('en');
	});

	it('falls back to the URL below the base path', () => {
		expect(getLang(astro('/ghe-launchpad/de/'))).toBe('de');
		expect(getLang(astro('/ghe-launchpad/de/steps/prepare/'))).toBe('de');
		expect(getLang(astro('/ghe-launchpad/steps/prepare/'))).toBe('en');
		expect(getLang(astro('/ghe-launchpad/'))).toBe('en');
	});

	it('does not mistake slugs that start with "de" for German', () => {
		expect(getLang(astro('/ghe-launchpad/developer-setup/'))).toBe('en');
	});
});

describe('href', () => {
	it('builds base-prefixed links with a trailing slash', () => {
		expect(href('en')).toBe('/ghe-launchpad/');
		expect(href('en', 'steps/prepare')).toBe('/ghe-launchpad/steps/prepare/');
	});

	it('adds the German locale prefix', () => {
		expect(href('de')).toBe('/ghe-launchpad/de/');
		expect(href('de', 'resources/checklist')).toBe('/ghe-launchpad/de/resources/checklist/');
	});

	it('normalises leading and trailing slashes', () => {
		expect(href('en', '/steps/teams/')).toBe('/ghe-launchpad/steps/teams/');
	});
});

describe('UI strings', () => {
	it('have the same keys in English and German', () => {
		expect(Object.keys(ui.de).sort()).toEqual(Object.keys(ui.en).sort());
	});

	it('are never empty', () => {
		for (const lang of ['en', 'de'] as const) {
			for (const [key, value] of Object.entries(ui[lang])) {
				expect(value.trim(), `${lang}.${key}`).not.toBe('');
			}
		}
	});

	it('are looked up per language', () => {
		expect(t('en', 'step')).toBe('Step');
		expect(t('de', 'step')).toBe('Schritt');
		expect(t('de', 'click.entra')).toBe('Im Entra Admin Center');
	});

	it('name the Copilot contact generically', () => {
		expect(t('en', 'role.contact')).toBe('Your Microsoft or GitHub contact');
	});
});

describe('formatDate', () => {
	const date = new Date('2026-10-23T00:00:00Z');

	it('writes day month year in English', () => {
		expect(formatDate('en', date)).toBe('23 October 2026');
	});

	it('uses German month names and punctuation', () => {
		expect(formatDate('de', date)).toBe('23. Oktober 2026');
	});

	it('is independent of the local time zone', () => {
		// West of UTC, a date-only "last checked" value would otherwise show as the day before.
		vi.stubEnv('TZ', 'America/Los_Angeles');
		try {
			expect(formatDate('en', new Date('2026-01-01T00:30:00Z'))).toBe('1 January 2026');
		} finally {
			vi.unstubAllEnvs();
		}
	});
});
