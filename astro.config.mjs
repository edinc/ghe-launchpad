// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

const repoUrl = 'https://github.com/edinc/ghe-launchpad';

export default defineConfig({
	site: 'https://edinc.github.io',
	base: '/ghe-launchpad',
	devToolbar: { enabled: false },
	integrations: [
		starlight({
			title: 'GHE Launchpad',
			description:
				'A visual, self-service walkthrough to set up GitHub Enterprise Cloud with data residency (GHE.com): Enterprise Managed Users with Microsoft Entra ID, Azure billing and GitHub Copilot.',
			favicon: '/favicon.svg',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: repoUrl }],
			editLink: { baseUrl: `${repoUrl}/edit/main/` },
			credits: false,
			plugins: [
				starlightLinksValidator({
					errorOnInconsistentLocale: true,
					errorOnRelativeLinks: true,
					errorOnInvalidHashes: true,
				}),
			],
		}),
	],
});
