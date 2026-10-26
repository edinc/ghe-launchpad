import { expect, test } from '@playwright/test';

test('publishes the README badges as shields.io endpoints', async ({ request, isMobile }) => {
	test.skip(isMobile, 'no browser needed; runs once');
	const docs = await request.get('/ghe-launchpad/badges/docs-checked.json');
	expect(docs.ok()).toBe(true);
	const docsBadge = await docs.json();
	expect(docsBadge).toMatchObject({ schemaVersion: 1, label: 'docs last checked', color: 'blue' });
	expect(docsBadge.message).toMatch(/^\d{4}-\d{2}-\d{2}$/);

	const coverage = await request.get('/ghe-launchpad/badges/coverage.json');
	expect(coverage.ok()).toBe(true);
	const coverageBadge = await coverage.json();
	expect(coverageBadge).toMatchObject({ schemaVersion: 1, label: 'coverage' });
	expect(coverageBadge.message).toMatch(/^(\d+%|unknown)$/);
});
