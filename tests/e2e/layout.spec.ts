import { expect, test } from '@playwright/test';

test.describe('small screens', () => {
	test.skip(({ isMobile }) => isMobile, 'runs once, at an explicit 320px width');
	test.use({ viewport: { width: 320, height: 720 } });

	test('no page scrolls sideways at 320px', async ({ page, request }) => {
		test.setTimeout(180_000);
		const sitemap = await (await request.get('/ghe-launchpad/sitemap-0.xml')).text();
		const paths = [...sitemap.matchAll(/<loc>https:\/\/edinc\.github\.io(\/ghe-launchpad\/[^<]*)<\/loc>/g)].map((m) => m[1]);
		expect(paths.length).toBeGreaterThanOrEqual(34);

		const overflowing: string[] = [];
		for (const path of paths) {
			await page.goto(path);
			await page.evaluate(() => document.fonts.ready);
			const wide = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
			if (wide) overflowing.push(path);
		}
		expect(overflowing).toEqual([]);
	});
});
