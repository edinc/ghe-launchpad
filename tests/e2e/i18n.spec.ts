import { expect, test } from '@playwright/test';

test.describe('languages', () => {
	test('the language picker keeps you on the same page', async ({ page, isMobile }) => {
		test.skip(isMobile, 'the picker sits in the menu on phones');
		await page.goto('/ghe-launchpad/steps/connect-azure/');
		await page.locator('header starlight-lang-select select').selectOption({ label: 'Deutsch' });
		await expect(page).toHaveURL(/\/ghe-launchpad\/de\/steps\/connect-azure\/$/);
		await expect(page.locator('html')).toHaveAttribute('lang', 'de');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Schritt 3: /);
	});

	test('phone readers find German from the home page', async ({ page, isMobile }) => {
		test.skip(!isMobile, 'the shortcut only shows on small screens');
		await page.goto('/ghe-launchpad/');
		await page.getByRole('link', { name: /Auf Deutsch lesen/ }).click();
		await expect(page).toHaveURL(/\/ghe-launchpad\/de\/$/);
	});

	test('German pages link to German pages and German docs', async ({ page }) => {
		await page.goto('/ghe-launchpad/de/steps/provision-users/');
		const internal = await page
			.locator('.sl-markdown-content a[href^="/ghe-launchpad/"]')
			.evaluateAll((links) => links.map((a) => a.getAttribute('href')!));
		expect(internal.length).toBeGreaterThan(0);
		for (const href of internal) expect(href).toMatch(/^\/ghe-launchpad\/de\//);
		const docs = await page.locator('.doc-links a').evaluateAll((links) => links.map((a) => a.getAttribute('href')!));
		expect(docs.length).toBeGreaterThan(0);
		for (const href of docs) expect(href).toMatch(/^https:\/\/(docs\.github\.com\/de\/|learn\.microsoft\.com\/de-de\/)/);
	});
});
