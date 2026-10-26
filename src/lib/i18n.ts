import type { AstroGlobal } from 'astro';

export type Lang = 'en' | 'de';

/** A string in both site languages. */
export type L10n = { en: string; de: string };

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function getLang(astro: Pick<AstroGlobal, 'locals' | 'url'>): Lang {
	const lang = astro.locals?.starlightRoute?.lang;
	if (lang) return lang.toLowerCase().startsWith('de') ? 'de' : 'en';
	return astro.url.pathname.slice(base.length - 1).startsWith('/de/') ? 'de' : 'en';
}

/** Site-relative link to a page slug (e.g. `steps/prepare`) in the given language. */
export function href(lang: Lang, slug = '') {
	const path = slug.replace(/^\/|\/$/g, '');
	return `${base}${lang === 'de' ? 'de/' : ''}${path ? `${path}/` : ''}`;
}

export const ui = {
	en: {
		'role.lead': 'Project lead',
		'role.owner': 'Enterprise owner',
		'role.entra': 'Entra admin',
		'role.azure': 'Azure subscription owner',
		'role.contact': 'Your Microsoft or GitHub contact',
		'role.dev': 'Developers',
		'role.lead.short': 'Project lead',
		'role.owner.short': 'Enterprise owner',
		'role.entra.short': 'Entra admin',
		'role.azure.short': 'Azure owner',
		'role.contact.short': 'Your contact',
		'role.dev.short': 'Developers',
		'intro.who': 'Who',
		'intro.time': 'Hands-on',
		'intro.wait': 'Then wait',
		'intro.needs': 'Needs',
		'intro.before': 'Have ready',
		'intro.nothing': 'Nothing before this',
		'intro.mapCaption': 'The part of your setup this step touches',
		'click.github': 'In GitHub',
		'click.entra': 'In the Entra admin center',
		'click.azure': 'In the Azure portal',
		'click.ide': 'In your IDE',
		'click.vs': 'In Visual Studio',
		'video.label': 'Watch',
		'video.play': 'Play video',
		'video.privacy': 'Loads from YouTube (youtube-nocookie.com) only after you press play.',
		'video.open': 'Open on YouTube',
		'video.adc':
			'Microsoft video series, recorded in October 2025, in English. Screens may have changed since, and the video may show GitHub.com instead of GHE.com.',
		'video.github': 'Official GitHub video, in English. Screens may have changed since recording.',
		'video.minutes': 'min',
		'done.print': 'All checkpoints on one printable page',
		'path.a': 'Path A · Full platform',
		'path.b': 'Path B · Copilot only',
		'path.a.short': 'Path A',
		'path.b.short': 'Path B',
		'path.only': 'only',
		'step': 'Step',
		'steps.total': 'steps',
		'docs.official': 'Official docs',
		'footer.disclaimer':
			'An independent community guide. It is not official GitHub or Microsoft documentation, and the official documentation is always the source of truth.',
		'footer.checked': 'Last checked against the official docs:',
		'footer.about': 'About this guide',
		'footer.issue': 'Spotted something outdated? Open an issue',
		'diagram.scroll': 'Scroll sideways to see the whole sketch',
		'checklist.print': 'Print this checklist',
		'journey.role': 'Role',
		'journey.wait': 'wait',
		'journey.parallel': 'Can run in parallel',
		'route.start': 'Start here',
		'route.finish': 'Copilot in every IDE',
	},
	de: {
		'role.lead': 'Projektleitung',
		'role.owner': 'Enterprise-Owner',
		'role.entra': 'Entra-Admin',
		'role.azure': 'Besitzer des Azure-Abonnements',
		'role.contact': 'Ihr Microsoft- oder GitHub-Ansprechpartner',
		'role.dev': 'Entwickler',
		'role.lead.short': 'Projektleitung',
		'role.owner.short': 'Enterprise-Owner',
		'role.entra.short': 'Entra-Admin',
		'role.azure.short': 'Azure-Besitzer',
		'role.contact.short': 'Ansprechpartner',
		'role.dev.short': 'Entwickler',
		'intro.who': 'Wer',
		'intro.time': 'Aufwand',
		'intro.wait': 'Danach warten',
		'intro.needs': 'Setzt voraus',
		'intro.before': 'Bereithalten',
		'intro.nothing': 'Keine Voraussetzungen',
		'intro.mapCaption': 'Dieser Teil Ihres Setups ist betroffen',
		'click.github': 'In GitHub',
		'click.entra': 'Im Entra Admin Center',
		'click.azure': 'Im Azure-Portal',
		'click.ide': 'In Ihrer IDE',
		'click.vs': 'In Visual Studio',
		'video.label': 'Video',
		'video.play': 'Video abspielen',
		'video.privacy': 'Wird erst beim Abspielen von YouTube (youtube-nocookie.com) geladen.',
		'video.open': 'Auf YouTube öffnen',
		'video.adc':
			'Microsoft-Videoreihe, aufgenommen im Oktober 2025, auf Englisch. Die Oberfläche kann sich inzwischen geändert haben, und das Video zeigt eventuell GitHub.com statt GHE.com.',
		'video.github': 'Offizielles GitHub-Video, auf Englisch. Die Oberfläche kann sich seit der Aufnahme geändert haben.',
		'video.minutes': 'Min.',
		'done.print': 'Alle Prüfpunkte auf einer druckbaren Seite',
		'path.a': 'Variante A · Komplette Plattform',
		'path.b': 'Variante B · Nur Copilot',
		'path.a.short': 'Variante A',
		'path.b.short': 'Variante B',
		'path.only': 'nur',
		'step': 'Schritt',
		'steps.total': 'Schritte',
		'docs.official': 'Offizielle Dokumentation',
		'footer.disclaimer':
			'Ein unabhängiger Community-Leitfaden. Er ist keine offizielle Dokumentation von GitHub oder Microsoft; maßgeblich ist immer die offizielle Dokumentation.',
		'footer.checked': 'Zuletzt mit der offiziellen Dokumentation abgeglichen:',
		'footer.about': 'Über diesen Leitfaden',
		'footer.issue': 'Etwas veraltet? Issue eröffnen',
		'diagram.scroll': 'Seitlich scrollen, um die ganze Skizze zu sehen',
		'checklist.print': 'Checkliste drucken',
		'journey.role': 'Rolle',
		'journey.wait': 'warten',
		'journey.parallel': 'Kann parallel laufen',
		'route.start': 'Hier starten',
		'route.finish': 'Copilot in jeder IDE',
	},
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function t(lang: Lang, key: UiKey) {
	return ui[lang][key] ?? ui.en[key];
}

export function formatDate(lang: Lang, date: Date) {
	return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
}
