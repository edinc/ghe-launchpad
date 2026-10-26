import type { L10n } from '../lib/i18n';

export interface Video {
	youtubeId: string;
	title: string;
	summary: L10n;
	minutes?: number;
	source: 'adc' | 'github';
}

/**
 * Reference videos. The "adc" series is Microsoft's "Setting up GitHub Copilot for your Company"
 * (https://devblogs.microsoft.com/all-things-azure/tutorial-videos-setting-up-github-copilot-for-your-company/).
 */
export const videos = {
	licenses: {
		youtubeId: 'INU_eU7bxM0',
		title: 'GitHub Licenses Explained',
		summary: {
			en: 'How GitHub Enterprise and Copilot licenses fit together, which helps you pick a path.',
			de: 'Wie GitHub-Enterprise- und Copilot-Lizenzen zusammenhängen – hilfreich für die Wahl der Variante.',
		},
		minutes: 8,
		source: 'adc',
	},
	sso: {
		youtubeId: 'OEUzMxQ5Hxs',
		title: 'Configure SSO for your GitHub Tenant',
		summary: {
			en: 'Single sign-on with Microsoft Entra ID. It may show a different sign-on protocol than the OIDC setup on this page; follow the written steps for OIDC.',
			de: 'Single Sign-On mit Microsoft Entra ID. Eventuell zeigt das Video ein anderes Anmeldeprotokoll als das OIDC-Setup auf dieser Seite; folgen Sie für OIDC den Schritten hier.',
		},
		minutes: 15,
		source: 'adc',
	},
	azure: {
		youtubeId: 'RY8_rEBTSVo',
		title: 'Add an Azure Subscription to GitHub Enterprise',
		summary: {
			en: 'Connecting an Azure subscription so GitHub usage shows up on your Azure bill.',
			de: 'Ein Azure-Abonnement verbinden, damit die GitHub-Nutzung auf Ihrer Azure-Rechnung erscheint.',
		},
		minutes: 4,
		source: 'adc',
	},
	licensesEnterprise: {
		youtubeId: 'EptYX108uZ4',
		title: 'Assign GitHub Copilot Licenses (users on GitHub Enterprise)',
		summary: {
			en: 'Assigning Copilot to people who also work in GitHub organizations (Path A).',
			de: 'Copilot für Personen zuweisen, die auch in GitHub-Organisationen arbeiten (Variante A).',
		},
		minutes: 9,
		source: 'adc',
	},
	licensesCopilotOnly: {
		youtubeId: 'In_bCzuCZ6o',
		title: 'Assign GitHub Copilot Licenses (users not on GitHub Enterprise)',
		summary: {
			en: 'Assigning Copilot to people whose code stays outside GitHub (Path B).',
			de: 'Copilot für Personen zuweisen, deren Code außerhalb von GitHub bleibt (Variante B).',
		},
		minutes: 8,
		source: 'adc',
	},
	azureBilling: {
		youtubeId: 'Y-f7JKJ4_8Y',
		title: 'Billing GitHub consumption through an Azure subscription',
		summary: {
			en: 'GitHub’s own walkthrough of paying for GitHub usage through Azure.',
			de: 'GitHubs eigene Anleitung, wie Sie GitHub-Nutzung über Azure bezahlen.',
		},
		source: 'github',
	},
} satisfies Record<string, Video>;

export type VideoId = keyof typeof videos;
