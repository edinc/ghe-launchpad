import { expect, test } from '@playwright/test';

test.use({ colorScheme: 'dark' });

test('stays light even when the system or an earlier visit asked for dark', async ({ page }) => {
	await page.addInitScript(() => localStorage.setItem('starlight-theme', 'dark'));
	await page.goto('/ghe-launchpad/');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 248, 232)');
	await expect(page.locator('starlight-theme-select')).toHaveCount(0);
});
