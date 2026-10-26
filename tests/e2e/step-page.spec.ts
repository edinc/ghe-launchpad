import { expect, test } from '@playwright/test';

test.describe('a step page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/ghe-launchpad/steps/connect-azure/');
	});

	test('says who does it, how long it takes and what it needs', async ({ page }) => {
		await expect(page.locator('.page-title__num')).toHaveText('3');
		const intro = page.getByRole('region', { name: 'Step 3' });
		await expect(intro).toBeVisible();
		await expect(intro.locator('.fact--who .role-tag').first()).toBeVisible();
		await expect(intro.locator('.step-chip')).toHaveAttribute('href', '/ghe-launchpad/steps/secure-setup-user/');
	});

	test('shows click paths and "done when" checkpoints', async ({ page }) => {
		await expect(page.getByRole('group', { name: /^In GitHub: / }).first()).toBeVisible();
		await expect(page.locator('.done-list__item').first()).toBeVisible();
		await expect(page.locator('.done-when__more')).toHaveAttribute('href', '/ghe-launchpad/resources/checklist/');
	});

	test('opens troubleshooting answers on demand', async ({ page }) => {
		const answer = page.locator('.sl-markdown-content details').first();
		await expect(answer).not.toHaveAttribute('open', '');
		await answer.locator('summary').click();
		await expect(answer).toHaveAttribute('open', '');
	});

	test('links to the official English docs', async ({ page }) => {
		const docs = await page.locator('.doc-links a').evaluateAll((links) => links.map((a) => a.getAttribute('href')!));
		expect(docs.length).toBeGreaterThan(0);
		for (const href of docs) expect(href).toMatch(/^https:\/\/(docs\.github\.com\/en\/|learn\.microsoft\.com\/en-us\/)/);
	});

	test('ends with the disclaimer and the "last checked" date', async ({ page }) => {
		const footer = page.locator('.zine-footer');
		await expect(footer).toContainText('An independent community guide');
		await expect(footer.locator('time')).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}$/);
	});
});
