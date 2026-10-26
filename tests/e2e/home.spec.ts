import { expect, test } from '@playwright/test';

test.describe('home page', () => {
	test('introduces the guide and starts at step 0', async ({ page }) => {
		await page.goto('/ghe-launchpad/');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(/GitHub Enterprise on GHE\.com, step\s+by\s+step\./);
		await page.getByRole('link', { name: /Start with step 0/ }).first().click();
		await expect(page).toHaveURL(/\/ghe-launchpad\/steps\/prepare\/$/);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Step 0: Prepare: decisions and people');
	});

	test('draws the route through all 11 steps', async ({ page }) => {
		await page.goto('/ghe-launchpad/');
		const stops = page.locator('.route-stop__link');
		await expect(stops).toHaveCount(11);
		await stops.nth(3).click();
		await expect(page).toHaveURL(/\/steps\/connect-azure\/$/);
	});

	test('helps readers choose a path', async ({ page }) => {
		await page.goto('/ghe-launchpad/');
		await page.getByRole('link', { name: 'Which path fits me?' }).click();
		await expect(page).toHaveURL(/\/start\/choose-your-path\/$/);
		await expect(page.locator('.path-card')).toHaveCount(2);
	});

	test('is also available in German', async ({ page }) => {
		await page.goto('/ghe-launchpad/de/');
		await expect(page.locator('html')).toHaveAttribute('lang', 'de');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(/GitHub Enterprise auf GHE\.com, Schritt für Schritt\./);
		await expect(page.getByRole('link', { name: /Mit Schritt 0 starten/ }).first()).toHaveAttribute('href', '/ghe-launchpad/de/steps/prepare/');
	});
});
