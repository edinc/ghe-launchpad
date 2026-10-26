import type { L10n } from '../lib/i18n';

export type Role = 'lead' | 'owner' | 'entra' | 'azure' | 'contact' | 'dev';

/** Parts of the system sketch a step touches (see SystemMap). */
export type Focus = 'entra' | 'ghe' | 'azure' | 'ide' | 'copilot' | 'sso' | 'scim' | 'billing' | 'signin';

export interface Check {
	text: L10n;
	/** Only relevant for one path. */
	path?: 'a' | 'b';
}

export interface Step {
	id: string;
	num: number;
	title: L10n;
	short: L10n;
	/** First role leads the step; the rest help. */
	roles: Role[];
	time: L10n;
	wait?: L10n;
	needs: string[];
	focus: Focus[];
	/** Can run while you wait on steps 3–5. */
	parallel?: boolean;
	checks: Check[];
}

export const steps: Step[] = [
	{
		id: 'prepare',
		num: 0,
		title: { en: 'Prepare: decisions and people', de: 'Vorbereiten: Entscheidungen und Beteiligte' },
		short: { en: 'Prepare', de: 'Vorbereiten' },
		roles: ['lead'],
		time: { en: '≈ 1–2 h', de: '≈ 1–2 Std.' },
		wait: { en: 'Internal approvals', de: 'Interne Freigaben' },
		needs: [],
		focus: [],
		checks: [
			{ text: { en: 'You picked Path A (full platform) or Path B (Copilot only).', de: 'Sie haben Variante A (komplette Plattform) oder Variante B (nur Copilot) gewählt.' } },
			{ text: { en: 'You know who acts as enterprise owner, Entra Global Administrator and Azure subscription Owner.', de: 'Sie wissen, wer Enterprise-Owner, Entra-Globaler-Administrator und Besitzer des Azure-Abonnements ist.' } },
			{ text: { en: 'Region and subdomain are decided. The subdomain can’t be changed later.', de: 'Region und Subdomain stehen fest. Die Subdomain lässt sich später nicht ändern.' } },
			{ text: { en: 'Your network team has the GHE.com hostnames to allow.', de: 'Ihr Netzwerkteam hat die freizugebenden GHE.com-Hostnamen.' } },
		],
	},
	{
		id: 'start-trial',
		num: 1,
		title: { en: 'Start the GHE.com trial', de: 'GHE.com-Testversion starten' },
		short: { en: 'Start the trial', de: 'Testversion starten' },
		roles: ['owner'],
		time: { en: '≈ 15 min', de: '≈ 15 Min.' },
		wait: { en: 'Provisioning, up to a few hours', de: 'Bereitstellung, bis zu einigen Stunden' },
		needs: ['prepare'],
		focus: ['ghe'],
		checks: [
			{ text: { en: 'The trial exists in the right region with the right subdomain.', de: 'Die Testversion existiert in der richtigen Region mit der richtigen Subdomain.' } },
			{ text: { en: 'The welcome email with the password reset link has arrived.', de: 'Die Willkommens-E-Mail mit dem Link zum Zurücksetzen des Passworts ist da.' } },
		],
	},
	{
		id: 'secure-setup-user',
		num: 2,
		title: { en: 'Secure the setup user', de: 'Setup-Benutzer absichern' },
		short: { en: 'Setup user', de: 'Setup-Benutzer' },
		roles: ['owner'],
		time: { en: '≈ 20 min', de: '≈ 20 Min.' },
		needs: ['start-trial'],
		focus: ['ghe'],
		checks: [
			{ text: { en: '`SHORTCODE_admin` has a strong password, stored in your company password manager.', de: '`SHORTCODE_admin` hat ein starkes Passwort, abgelegt im Passwortmanager Ihres Unternehmens.' } },
			{ text: { en: 'Two-factor authentication is on and the recovery codes are stored.', de: 'Die Zwei-Faktor-Authentifizierung ist aktiv und die Wiederherstellungscodes sind abgelegt.' } },
			{ text: { en: 'A personal access token (classic) with `scim:enterprise` and no expiration is stored securely.', de: 'Ein Personal Access Token (classic) mit `scim:enterprise` ohne Ablaufdatum ist sicher abgelegt.' } },
		],
	},
	{
		id: 'connect-azure',
		num: 3,
		title: { en: 'Connect your Azure subscription', de: 'Azure-Abonnement verbinden' },
		short: { en: 'Connect Azure', de: 'Azure verbinden' },
		roles: ['owner', 'azure', 'entra'],
		time: { en: '≈ 15 min', de: '≈ 15 Min.' },
		wait: { en: 'Admin consent, if someone else approves', de: 'Administratorzustimmung, falls jemand anderes zustimmt' },
		needs: ['secure-setup-user'],
		focus: ['azure', 'billing'],
		checks: [
			{ text: { en: 'Admin consent for GitHub’s app is granted in Microsoft Entra ID.', de: 'Die Administratorzustimmung für die GitHub-App ist in Microsoft Entra ID erteilt.' } },
			{ text: { en: 'Your subscription ID shows under **Payment information** › **Metered billing via Azure**.', de: 'Ihre Abonnement-ID steht unter **Payment information** › **Metered billing via Azure**.' } },
		],
	},
	{
		id: 'activate-enterprise',
		num: 4,
		title: { en: 'Activate the enterprise', de: 'Enterprise-Konto aktivieren' },
		short: { en: 'Activate', de: 'Aktivieren' },
		roles: ['owner'],
		time: { en: '≈ 10 min', de: '≈ 10 Min.' },
		needs: ['connect-azure'],
		focus: ['ghe', 'billing'],
		checks: [
			{ text: { en: 'The enterprise is activated and no longer shows as a trial.', de: 'Das Enterprise-Konto ist aktiviert und wird nicht mehr als Testversion angezeigt.' } },
		],
	},
	{
		id: 'enable-copilot',
		num: 5,
		title: { en: 'Get Copilot enabled', de: 'Copilot freischalten lassen' },
		short: { en: 'Enable Copilot', de: 'Copilot freischalten' },
		roles: ['owner', 'contact'],
		time: { en: '≈ 15 min', de: '≈ 15 Min.' },
		wait: { en: 'Until your contact confirms', de: 'Bis Ihr Ansprechpartner bestätigt' },
		needs: ['activate-enterprise'],
		focus: ['copilot'],
		checks: [
			{ text: { en: 'You asked your Microsoft or GitHub contact to enable Copilot.', de: 'Sie haben Ihren Microsoft- oder GitHub-Ansprechpartner gebeten, Copilot freizuschalten.' } },
			{ text: { en: 'Copilot shows up under **Billing and licensing** › **Licensing**.', de: 'Copilot erscheint unter **Billing and licensing** › **Licensing**.' } },
			{ text: { en: 'Copilot policies under **AI controls** are set, including **Policies for enterprise-assigned users**.', de: 'Die Copilot-Richtlinien unter **AI controls** sind gesetzt, auch **Policies for enterprise-assigned users**.' } },
		],
	},
	{
		id: 'configure-sso',
		num: 6,
		title: { en: 'Turn on single sign-on with Entra ID', de: 'Single Sign-On mit Entra ID einrichten' },
		short: { en: 'Single sign-on', de: 'Single Sign-On' },
		roles: ['owner', 'entra'],
		time: { en: '≈ 20 min', de: '≈ 20 Min.' },
		needs: ['secure-setup-user'],
		focus: ['entra', 'sso'],
		parallel: true,
		checks: [
			{ text: { en: 'OIDC authentication is enabled for the enterprise.', de: 'Die OIDC-Authentifizierung ist für das Enterprise-Konto aktiviert.' } },
			{ text: { en: 'The SSO recovery codes are stored in your password manager.', de: 'Die SSO-Wiederherstellungscodes liegen in Ihrem Passwortmanager.' } },
		],
	},
	{
		id: 'provision-users',
		num: 7,
		title: { en: 'Provision users and groups with SCIM', de: 'Benutzer und Gruppen per SCIM bereitstellen' },
		short: { en: 'Provision users', de: 'Benutzer bereitstellen' },
		roles: ['entra', 'owner'],
		time: { en: '≈ 45 min', de: '≈ 45 Min.' },
		wait: { en: 'Sync runs on a schedule', de: 'Synchronisierung läuft zeitgesteuert' },
		needs: ['configure-sso'],
		focus: ['entra', 'scim'],
		parallel: true,
		checks: [
			{ text: { en: '**Test Connection** succeeds in the Entra admin center.', de: '**Test Connection** (Verbindung testen) ist im Entra Admin Center erfolgreich.' } },
			{ text: { en: 'Users and groups are assigned to the app and provisioning is running.', de: 'Benutzer und Gruppen sind der App zugewiesen und die Bereitstellung läuft.' } },
			{ text: { en: 'A test user signs in to `SUBDOMAIN.ghe.com` with their Entra account.', de: 'Ein Testbenutzer meldet sich mit seinem Entra-Konto bei `SUBDOMAIN.ghe.com` an.' } },
		],
	},
	{
		id: 'teams',
		num: 8,
		title: { en: 'Create enterprise teams', de: 'Enterprise-Teams anlegen' },
		short: { en: 'Teams', de: 'Teams' },
		roles: ['owner', 'entra'],
		time: { en: '≈ 30 min', de: '≈ 30 Min.' },
		wait: { en: 'Until groups have synced', de: 'Bis die Gruppen synchronisiert sind' },
		needs: ['provision-users'],
		focus: ['scim', 'ghe'],
		parallel: true,
		checks: [
			{ text: { en: 'Each enterprise team is linked to an Entra group and lists its members.', de: 'Jedes Enterprise-Team ist mit einer Entra-Gruppe verknüpft und zeigt deren Mitglieder.' } },
			{ text: { en: 'Organizations exist and the right teams have access to them.', de: 'Die Organisationen existieren und die richtigen Teams haben Zugriff.' }, path: 'a' },
			{ text: { en: 'No user was added to an organization by accident.', de: 'Kein Benutzer wurde versehentlich zu einer Organisation hinzugefügt.' }, path: 'b' },
		],
	},
	{
		id: 'assign-licenses',
		num: 9,
		title: { en: 'Assign Copilot licenses', de: 'Copilot-Lizenzen zuweisen' },
		short: { en: 'Assign licenses', de: 'Lizenzen zuweisen' },
		roles: ['owner'],
		time: { en: '≈ 10 min', de: '≈ 10 Min.' },
		needs: ['enable-copilot', 'teams'],
		focus: ['copilot'],
		checks: [
			{ text: { en: 'Copilot Business licenses are assigned to your enterprise teams (or single users).', de: 'Copilot-Business-Lizenzen sind Ihren Enterprise-Teams (oder einzelnen Benutzern) zugewiesen.' } },
			{ text: { en: 'A pilot user sees Copilot as active on `SUBDOMAIN.ghe.com`.', de: 'Ein Pilotbenutzer sieht Copilot auf `SUBDOMAIN.ghe.com` als aktiv.' } },
		],
	},
	{
		id: 'developer-setup',
		num: 10,
		title: { en: 'Get developers coding with Copilot', de: 'Entwickler mit Copilot starten lassen' },
		short: { en: 'Developers', de: 'Entwickler' },
		roles: ['dev'],
		time: { en: '≈ 10 min per person', de: '≈ 10 Min. pro Person' },
		needs: ['assign-licenses'],
		focus: ['ide', 'signin'],
		checks: [
			{ text: { en: 'Developers sign in to `SUBDOMAIN.ghe.com`, not to github.com.', de: 'Entwickler melden sich bei `SUBDOMAIN.ghe.com` an, nicht bei github.com.' } },
			{ text: { en: 'Copilot answers in their IDE or CLI.', de: 'Copilot antwortet in ihrer IDE oder CLI.' } },
		],
	},
];

export const stepById = (id: string) => {
	const step = steps.find((s) => s.id === id);
	if (!step) throw new Error(`Unknown step "${id}"`);
	return step;
};

export const roleOrder: Role[] = ['lead', 'owner', 'entra', 'azure', 'contact', 'dev'];

/** Minimal inline formatting for data strings: `code` and **strong**. Input is trusted repo content. */
export function inline(text: string) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
