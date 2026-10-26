/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig loads astro.config.mjs, so .astro components can be rendered in tests
// with Astro's container API and are measured like any other source file.
export default getViteConfig({
	test: {
		// Same base path as the published site, so links and language detection behave like in production.
		env: { BASE_URL: '/ghe-launchpad/' },
		include: ['tests/unit/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.{ts,astro}'],
			exclude: [
				// Starlight overrides need Starlight's full page context; the Playwright UI tests cover them.
				'src/components/overrides/**',
				// Badge endpoints only wrap src/lib/badges.ts (unit-tested); the UI tests check their output.
				'src/pages/**',
				'src/content.config.ts',
			],
			reporter: ['text', 'json-summary', 'html'],
			thresholds: { statements: 70, branches: 70, functions: 70, lines: 70 },
		},
	},
});
