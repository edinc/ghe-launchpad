import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
	'/ghe-launchpad/',
	'/ghe-launchpad/start/choose-your-path/',
	'/ghe-launchpad/start/journey-map/',
	'/ghe-launchpad/steps/connect-azure/',
	'/ghe-launchpad/steps/developer-setup/',
	'/ghe-launchpad/resources/checklist/',
	'/ghe-launchpad/de/',
	'/ghe-launchpad/de/steps/provision-users/',
];

test.use({ reducedMotion: 'reduce' });

/**
 * Starlight's own search button shows its keyboard shortcut (Ctrl K / ⌘K) next to the label "Search", and axe counts
 * that hint as visible text missing from the accessible name. The button is Starlight's, and speech users can still
 * say "Search", so only this rule is skipped, and only for that button.
 */
const isStarlightSearchHint = (violation: { id: string; nodes: { target: unknown[] }[] }) =>
	violation.id === 'label-content-name-mismatch' &&
	violation.nodes.every((node) => node.target.join(' ').includes('button[data-open-modal'));

for (const path of pages) {
	test(`${path} has no detectable WCAG 2.1 A/AA violations`, async ({ page }) => {
		await page.goto(path);
		await page.evaluate(() => document.fonts.ready);
		const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
		expect(
			violations.filter((v) => !isStarlightSearchHint(v)).map((v) => `${v.id} (${v.nodes.length}): ${v.help} → ${v.nodes[0]?.target.join(' ')}`)
		).toEqual([]);
	});
}
