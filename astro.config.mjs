// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

const repoUrl = 'https://github.com/edinc/ghe-launchpad';

const steps = [
	'prepare',
	'start-trial',
	'secure-setup-user',
	'connect-azure',
	'activate-enterprise',
	'enable-copilot',
	'configure-sso',
	'provision-users',
	'teams',
	'assign-licenses',
	'developer-setup',
];

export default defineConfig({
	site: 'https://edinc.github.io',
	base: '/ghe-launchpad',
	devToolbar: { enabled: false },
	integrations: [
		starlight({
			title: 'GHE Launchpad',
			description:
				'A visual, self-service walkthrough to set up GitHub Enterprise Cloud with data residency (GHE.com): Enterprise Managed Users with Microsoft Entra ID, Azure billing and GitHub Copilot.',
			logo: {
				src: './src/assets/logo.svg',
			},
			favicon: '/favicon.svg',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: repoUrl }],
			editLink: { baseUrl: `${repoUrl}/edit/main/` },
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource/permanent-marker/400.css',
				'@fontsource/patrick-hand-sc/400.css',
				'./src/styles/custom.css',
			],
			components: {
				Hero: './src/components/overrides/Hero.astro',
				PageTitle: './src/components/overrides/PageTitle.astro',
				Footer: './src/components/overrides/Footer.astro',
				// Light theme only.
				ThemeProvider: './src/components/overrides/ThemeProvider.astro',
				ThemeSelect: './src/components/overrides/ThemeSelect.astro',
			},
			expressiveCode: {
				themes: ['github-light'],
				styleOverrides: {
					borderRadius: '14px',
					borderWidth: '2px',
					borderColor: 'var(--ink)',
					codeBackground: 'var(--paper-card)',
					codeFontSize: '0.9rem',
					uiFontFamily: 'var(--font-hand)',
					uiFontSize: '1.05rem',
					frames: {
						editorTabBarBackground: 'var(--paper-sunk)',
						editorActiveTabBackground: 'var(--paper-card)',
						editorActiveTabIndicatorTopColor: 'var(--hl-pink)',
						editorActiveTabForeground: 'var(--ink)',
						editorTabBarBorderBottomColor: 'var(--ink)',
						terminalTitlebarBackground: 'var(--paper-sunk)',
						terminalTitlebarForeground: 'var(--ink)',
						terminalTitlebarBorderBottomColor: 'var(--ink)',
						terminalBackground: 'var(--paper-card)',
						inlineButtonForeground: 'var(--ink)',
						inlineButtonBorder: 'var(--ink)',
						tooltipSuccessBackground: 'var(--hl-teal)',
						tooltipSuccessForeground: '#111111',
					},
					textMarkers: {
						markBackground: 'var(--mark-bg)',
						markBorderColor: 'var(--hl-yellow)',
					},
				},
			},
			credits: false,
			plugins: [
				starlightLinksValidator({
					errorOnInconsistentLocale: true,
					errorOnRelativeLinks: true,
					errorOnInvalidHashes: true,
				}),
			],
			sidebar: [
				{
					label: 'Start here',
					translations: { de: 'Start' },
					items: [{ slug: 'start/choose-your-path' }, { slug: 'start/journey-map' }],
				},
				{
					label: 'Setup steps',
					translations: { de: 'Einrichtungsschritte' },
					items: steps.map((step, i) => ({ slug: `steps/${step}`, attrs: { 'data-step': String(i) } })),
				},
				{
					label: 'Resources',
					translations: { de: 'Ressourcen' },
					items: [{ slug: 'resources/checklist' }, { slug: 'resources/videos' }, { slug: 'resources/about' }],
				},
			],
		}),
	],
});
