import { expect, test } from '@playwright/test';

test.describe('printable checklist', () => {
	test('lists every step and opens the print dialog', async ({ page }) => {
		await page.addInitScript(() => {
			window.print = () => {
				document.documentElement.dataset.printed = 'yes';
			};
		});
		await page.goto('/ghe-launchpad/resources/checklist/');
		await expect(page.locator('.checklist__step')).toHaveCount(11);
		await page.getByRole('button', { name: 'Print this checklist' }).click();
		await expect(page.locator('html')).toHaveAttribute('data-printed', 'yes');
	});

	test('prints without buttons', async ({ page }) => {
		await page.goto('/ghe-launchpad/resources/checklist/');
		await page.emulateMedia({ media: 'print' });
		await expect(page.getByRole('button', { name: 'Print this checklist' })).toBeHidden();
		await expect(page.locator('.checklist__step').first()).toBeVisible();
	});
});
