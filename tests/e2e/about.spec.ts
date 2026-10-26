import { expect, test } from '@playwright/test';

test.describe('about page', () => {
	test('credits the creator and maintainer and links the source', async ({ page }) => {
		await page.goto('/ghe-launchpad/resources/about/');
		const credits = page.locator('.sl-markdown-content p', { hasText: 'Created and maintained by' });
		await expect(credits.getByRole('link', { name: 'Edin Cenanovic' })).toHaveAttribute('href', 'https://edincenanovic.com');
		await expect(credits.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/edinc/ghe-launchpad');
	});

	test('explains the weekly AI docs check in both languages', async ({ page }) => {
		const workflow = 'https://github.com/edinc/ghe-launchpad/blob/main/.github/workflows/docs-check.md';
		await page.goto('/ghe-launchpad/resources/about/');
		await expect(page.getByRole('link', { name: 'AI agent' })).toHaveAttribute('href', workflow);
		await page.goto('/ghe-launchpad/de/resources/about/');
		await expect(page.getByRole('link', { name: 'KI-Agent' })).toHaveAttribute('href', workflow);
	});

	test('credits the creator in German too', async ({ page }) => {
		await page.goto('/ghe-launchpad/de/resources/about/');
		const credits = page.locator('.sl-markdown-content p', { hasText: 'Erstellt und gepflegt von' });
		await expect(credits.getByRole('link', { name: 'Edin Cenanovic' })).toHaveAttribute('href', 'https://edincenanovic.com');
	});
});
