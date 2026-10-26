import { expect, test } from '@playwright/test';

const youtube = /youtube|ytimg|googlevideo/;

test('nothing is loaded from YouTube until the reader presses play', async ({ page }) => {
	const requests: string[] = [];
	page.on('request', (request) => {
		if (youtube.test(request.url())) requests.push(request.url());
	});
	await page.route(youtube, (route) => route.abort());

	await page.goto('/ghe-launchpad/steps/connect-azure/');
	await page.waitForLoadState('networkidle');
	expect(requests).toEqual([]);

	// Wait for the request itself: the iframe's src is set before the browser reports the request.
	const embed = page.waitForRequest((request) => request.url().includes('youtube-nocookie.com/embed/'));
	await page.getByRole('button', { name: /^Play video: / }).first().click();
	await expect(page.locator('.video iframe').first()).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
	await embed;
});

test('no cookies are set while reading', async ({ page, context }) => {
	await page.goto('/ghe-launchpad/');
	await page.goto('/ghe-launchpad/steps/prepare/');
	expect(await context.cookies()).toEqual([]);
});
