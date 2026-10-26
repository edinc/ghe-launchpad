import { expect, test } from '@playwright/test';

test.describe('navigation', () => {
	test('the sidebar numbers the steps 0 to 10', async ({ page, isMobile }) => {
		test.skip(isMobile, 'the sidebar is behind the menu button on phones');
		await page.goto('/ghe-launchpad/steps/teams/');
		const steps = page.locator('.sidebar-content a[data-step]');
		await expect(steps).toHaveCount(11);
		expect(await steps.evaluateAll((links) => links.map((a) => a.getAttribute('data-step')))).toEqual(
			[...Array(11).keys()].map(String)
		);
		await expect(page.locator('.sidebar-content a[aria-current="page"]')).toHaveAttribute('data-step', '8');
	});

	test('the menu on phones lists every step', async ({ page, isMobile }) => {
		test.skip(!isMobile, 'phones only');
		await page.goto('/ghe-launchpad/steps/prepare/');
		await page.locator('.sl-menu-button').click();
		await expect(page.locator('#starlight__sidebar a[data-step]')).toHaveCount(11);
		await page.locator('#starlight__sidebar a[data-step="6"]').click();
		await expect(page).toHaveURL(/\/steps\/configure-sso\/$/);
	});

	test('previous and next walk through the steps', async ({ page }) => {
		await page.goto('/ghe-launchpad/steps/connect-azure/');
		await expect(page.locator('a[rel="prev"]')).toContainText('Secure the setup user');
		await page.locator('a[rel="next"]').click();
		await expect(page).toHaveURL(/\/steps\/activate-enterprise\/$/);
		await expect(page.locator('.page-title__num')).toHaveText('4');
	});

	test('unknown pages answer with 404', async ({ page }) => {
		const response = await page.goto('/ghe-launchpad/no-such-page/');
		expect(response?.status()).toBe(404);
	});
});

test.describe('search', () => {
	test('finds pages by keyword', async ({ page, isMobile }) => {
		test.skip(isMobile, 'covered on desktop');
		await page.goto('/ghe-launchpad/');
		await page.locator('site-search button[data-open-modal]').click();
		await page.locator('.pagefind-ui__search-input').fill('SCIM');
		await expect(page.locator('.pagefind-ui__result').first()).toBeVisible();
	});
});
