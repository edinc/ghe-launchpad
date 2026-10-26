# AGENTS.md

How we work on GHE Launchpad. Written for AI coding agents, and just as useful as a checklist for people.

## Workflow

1. **Never commit to `main`.** Every push to `main` deploys the site. Start a feature branch for each change: `git switch -c <short-topic>`.
2. **Make the change completely**, in English and German (see [Content rules](#content-rules)), with tests for new logic.
3. **Run every check locally** and keep them green:
   ```sh
   npm run check          # astro check: 0 errors
   npm run build          # also validates every internal link and anchor
   npm run test:coverage  # unit and component tests, fails below 70% coverage
   npm run test:e2e       # Playwright UI tests (run `npx playwright install chromium` once)
   ```
4. **Review before opening a pull request.** Run three separate code reviews of `git diff main...HEAD`, each by a different AI model (for example one Claude, one GPT and one Gemini model). Fix every valid finding, then ask all three to review again. Repeat until all three report no findings.
5. **Open the pull request** only then: one topic per pull request, CI green (🧱 Type check & build, 🧪 Unit tests & coverage, 🎭 UI tests). Summarize what changed, how it was tested and what the reviews found.

## Project facts

- **Stack:** Astro 7 and Starlight, built as a static site and deployed to GitHub Pages at `https://edinc.github.io/ghe-launchpad/` (base path `/ghe-launchpad`). Node.js 22.23.4 or later (`.nvmrc`; CI always uses the newest 22.x).
- **Layout:** English pages in `src/content/docs/`, German pages in `src/content/docs/de/` with the same file names. Step metadata (roles, time, waits, checkpoints) lives once in `src/data/steps.ts`; UI strings for both languages in `src/lib/i18n.ts`.
- **Dependencies:** `package-lock.json` has no registry URLs (`.npmrc`) and pins every package with SHA-512; `tests/unit/lockfile.test.ts` checks both. After installing through a mirror that only publishes SHA-1, run `npm run lockfile:sha512`.
- **Design:** `DESIGN.md` is the visual system ("sketch explainer"), `PRODUCT.md` the audience and constraints. Read both before touching the UI.

## Content rules

- Change **both languages** in the same pull request, and update `lastVerified: YYYY-MM-DD` in both when you re-check a page against the official documentation.
- **Internal links** are absolute with the base path and stay in the page's language: `/ghe-launchpad/steps/prepare/` and `/ghe-launchpad/de/steps/prepare/`. The build fails otherwise.
- **Official docs links** match the page's language: `docs.github.com/en/…` ↔ `docs.github.com/de/…`, `learn.microsoft.com/en-us/…` ↔ `learn.microsoft.com/de-de/…`.
- **German:** formal "Sie", never "du". GitHub's interface is English-only, so GitHub button and menu names stay in English (bold) with German explanations; for the Entra admin center and Azure portal, name the English label and add the German one in brackets where helpful.
- **Placeholders:** `SUBDOMAIN` and `SHORTCODE`, like the official docs.
- **Copilot enablement** is a handoff to "your Microsoft or GitHub contact". Don't describe or guess at internal processes.
- The guide is an **independent community guide**; the official documentation is always the source of truth, and every step links to it.

## Design rules

- **Light theme only.** No dark mode, no theme switch, no `prefers-color-scheme` styles (Starlight's `ThemeProvider` and `ThemeSelect` are overridden).
- **No screenshots.** Visuals are the Rough.js diagrams and click-to-load videos.
- **No GitHub logo** as logo, favicon or doodle (GitHub's brand rules); the mark is the original rocket.
- **No tracking:** no cookies, no analytics, nothing loaded from YouTube before the reader presses play.
- Keep pages light: answers go into the step intro card, click paths and "done when" checkpoints, not long paragraphs.

## Tests

- Unit and component tests live in `tests/unit/` (Vitest, Astro container API), UI tests in `tests/e2e/` (Playwright, Chromium on desktop and phone sizes, including an axe accessibility scan).
- Coverage must stay at 70% or more for statements, branches, functions and lines.
- New behavior gets a test; a bug fix gets a test that fails without the fix.
