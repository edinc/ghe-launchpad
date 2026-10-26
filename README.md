# GHE Launchpad

A visual, self-service walkthrough for setting up **GitHub Enterprise Cloud with data residency (GHE.com)**: Enterprise Managed Users with Microsoft Entra ID (OIDC + SCIM), billing through an Azure subscription, activating the enterprise and GitHub Copilot. In English and German.

**Site:** https://edinc.github.io/ghe-launchpad/ (German: https://edinc.github.io/ghe-launchpad/de/)

Send the link to a customer and they can work through the setup on their own: 11 ordered steps, who does what, how long it takes, what to wait for, click paths, "done when" checkpoints, troubleshooting, the matching official docs and reference videos. It covers two paths:

- **Path A · Full platform:** code on GitHub plus Copilot.
- **Path B · Copilot only:** code stays in Azure DevOps, GitLab, Bitbucket etc.; an enterprise without organizations.

> [!NOTE]
> This is an independent community guide, not official GitHub or Microsoft documentation. The official documentation is always the source of truth, and every step links to it.

> [!NOTE]
> Work in progress: the guide arrives in a series of pull requests.

## Run it locally

Requires Node.js 22.22 or later (see `.nvmrc`).

```sh
nvm use            # or any Node.js >= 22.22
npm ci
npm run dev        # http://localhost:4321/ghe-launchpad/
npm run check      # type check (astro check)
npm run build      # production build into dist/, also validates every internal link
npm run preview    # serve the production build
npm test           # unit and component tests
npm run test:e2e   # UI tests in a real browser (run `npx playwright install chromium` once)
```

## Project structure

```text
src/
  content/docs/            English pages (root locale)
    index.mdx              home page
    start/                 choose your path, journey map
    steps/                 the 11 setup steps (0–10)
    resources/             printable checklist, videos, about
  content/docs/de/         German pages, same file names
  data/steps.ts            step metadata: titles, roles, time, waits, prerequisites, "done when" checkpoints (EN + DE)
  data/videos.ts           reference videos (YouTube IDs, titles, summaries)
  components/              StepIntro, ClickPath, Callout, DoneWhen, Video, RouteMap, JourneyMap, Checklist, Rocket, …
  components/diagrams/     hand-drawn SVG diagrams, generated at build time with Rough.js
  components/overrides/    Starlight overrides: Hero, PageTitle, Footer (disclaimer + "last checked" date), ThemeProvider + ThemeSelect (light theme only)
  lib/i18n.ts              UI strings for components (EN + DE)
  lib/rocket.ts            the rocket doodle in all its moods (logo art lives in src/assets/logo.svg and public/favicon.svg)
  styles/custom.css        the visual system ("sketch explainer": paper, marker ink, highlighters)
tests/
  unit/                    Vitest: helpers, data, content rules, browser script, components
  e2e/                     Playwright: the built site in Chromium (desktop + phone)
```

Built with [Astro Starlight](https://starlight.astro.build). Fonts are self-hosted (no font CDN), there are no cookies or analytics, and YouTube videos only load after the reader presses play.

## Updating content

- **Step text** lives in `src/content/docs/steps/*.mdx` (English) and `src/content/docs/de/steps/*.mdx` (German). Change both.
- **Who / time / waits / prerequisites / checkpoints** for each step live in `src/data/steps.ts`. They feed the step header card, the route on the home page, the journey map and the printable checklist, so update them once there.
- **German style:** formal “Sie”. GitHub’s interface is English-only, so GitHub button and menu names stay in English (in bold) with German explanations. The Entra admin center and Azure portal follow the user’s language; name the English label and add the German one in brackets where helpful.
- **Links:** internal links include the base path and stay in the page’s language, e.g. `/ghe-launchpad/steps/prepare/` and `/ghe-launchpad/de/steps/prepare/`. Link to language-matched official docs: `docs.github.com/en/…` ↔ `docs.github.com/de/…` and `learn.microsoft.com/en-us/…` ↔ `learn.microsoft.com/de-de/…`.
- **Placeholders:** use `SUBDOMAIN` (and `SHORTCODE` for the setup user) like the official docs. In code blocks, mark them with Expressive Code, e.g. ` ```text "SUBDOMAIN" `.

### “Last checked” dates

Every page has `lastVerified: YYYY-MM-DD` in its frontmatter; the footer shows it as “Last checked against the official docs”. When you re-check a page against the official documentation, update the date in both languages.

## Tests

- **Unit and component tests** (`tests/unit/`, [Vitest](https://vitest.dev)) cover the helpers in `src/lib` and `src/data`, the browser script in `src/scripts` and every component, rendered in English and German with Astro's container API. Content checks make sure every page exists in both languages, has a "last checked" date, links to the official docs in its own language and addresses German readers with "Sie". `npm run test:coverage` fails if statements, branches, functions or lines drop below **70%**; the Starlight overrides are left to the UI tests.
- **UI tests** (`tests/e2e/`, [Playwright](https://playwright.dev)) build the site, serve it with `astro preview` and drive Chromium at desktop and phone sizes: navigation, search, the language switch, step pages, the checklist and printing, the light theme, no YouTube requests before you press play, no sideways scrolling at 320 px, and an [axe](https://github.com/dequelabs/axe-core) accessibility scan (WCAG 2.1 A/AA).

## Checks

Every pull request and every push to `main` runs `.github/workflows/ci.yml` with three checks:

- 🧱 **Type check & build:** `astro check` and a production build, which fails on any broken internal link or heading anchor, and on links from a German page to an English one or the other way round (`starlight-links-validator`).
- 🧪 **Unit tests & coverage:** with the coverage table in the job summary and the HTML report as an artifact.
- 🎭 **UI tests (Playwright):** the report is uploaded when a test fails.

## Deployment

`.github/workflows/deploy.yml` (🚀 **Deploy to GitHub Pages**) publishes `main` to GitHub Pages once CI has passed for the newest commit on `main` (`site: https://edinc.github.io`, `base: /ghe-launchpad`). It never runs for pull requests, and it only publishes a commit that is still the newest on `main`, so re-running an old CI or Deploy run can't roll the site back. To redeploy by hand, run it on `main` from the Actions tab.

## Link check

`.github/workflows/link-check.yml` (🔗 **Check links and videos**) runs every Monday and on demand. It builds the site and checks every external link on it with [lychee](https://lychee.cli.rs) (configuration: `lychee.toml`), and every embedded YouTube video through YouTube's oEmbed endpoint. Problems open or update one issue labeled `broken-links`; the workflow closes that issue once everything passes again. If a check can't reach a verdict (a lychee error, YouTube unreachable), the run fails and no issue changes. To run it locally after `npm run build`: `lychee --config lychee.toml 'dist/**/*.html' README.md`.

## Design notes

`PRODUCT.md` records who the guide is for and its constraints. `DESIGN.md` (with its machine-readable sidecar `.impeccable/design.json`) documents the visual system: the “sketch explainer” direction (cream paper, light theme only, marker headlines, yellow/pink/teal highlighters, wobbly hand-drawn borders and diagrams, and a doodled rocket that launches in the logo, idles on the pad while you wait and marks tips and cautions), its tokens, type, components and rules. The opening comment of `src/components/overrides/Hero.astro` summarizes it.

## License

[MIT](LICENSE) © Edin Cenanovic
