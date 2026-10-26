import { defineConfig, devices } from '@playwright/test';

const port = 4329;
const ci = !!process.env.CI;

/** UI tests run against a production build served by `astro preview`. Chromium only, to keep CI lean. */
export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	forbidOnly: ci,
	retries: ci ? 1 : 0,
	reporter: ci ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL: `http://127.0.0.1:${port}`,
		trace: 'retain-on-failure',
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } },
	],
	webServer: {
		command: `npm run build && npm run preview -- --port ${port} --host 127.0.0.1`,
		url: `http://127.0.0.1:${port}/ghe-launchpad/`,
		// Never reuse a running server: the build lives in this command, so reuse would test a stale site.
		reuseExistingServer: false,
		timeout: 180_000,
	},
});
