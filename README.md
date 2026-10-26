# GHE Launchpad

A visual, self-service walkthrough for setting up **GitHub Enterprise Cloud with data residency (GHE.com)**: Enterprise Managed Users with Microsoft Entra ID (OIDC + SCIM), billing through an Azure subscription, activating the enterprise and GitHub Copilot. In English and German.

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
```

## Project structure

```text
src/
  content/docs/            English pages (root locale)
    index.mdx              home page
    start/                 choose your path, journey map
    steps/                 the 11 setup steps (0–10)
    resources/             printable checklist, videos, about
  data/steps.ts            step metadata: titles, roles, time, waits, prerequisites, "done when" checkpoints (EN + DE)
  data/videos.ts           reference videos (YouTube IDs, titles, summaries)
  components/              StepIntro, ClickPath, Callout, DoneWhen, Video, RouteMap, JourneyMap, Checklist, Rocket, …
  components/diagrams/     hand-drawn SVG diagrams, generated at build time with Rough.js
  components/overrides/    Starlight overrides: Hero, PageTitle, Footer (disclaimer + "last checked" date), ThemeProvider + ThemeSelect (light theme only)
  lib/i18n.ts              UI strings for components (EN + DE)
  lib/rocket.ts            the rocket doodle in all its moods (logo art lives in src/assets/logo.svg and public/favicon.svg)
  styles/custom.css        the visual system ("sketch explainer": paper, marker ink, highlighters)
```

Built with [Astro Starlight](https://starlight.astro.build). Fonts are self-hosted (no font CDN), there are no cookies or analytics, and YouTube videos only load after the reader presses play.

## Updating content

- **Step text** lives in `src/content/docs/steps/*.mdx`.
- **Who / time / waits / prerequisites / checkpoints** for each step live in `src/data/steps.ts`. They feed the step header card, the route on the home page, the journey map and the printable checklist, so update them once there.
- **Links:** internal links include the base path, e.g. `/ghe-launchpad/steps/prepare/`. Link to the official docs: `docs.github.com/en/…` and `learn.microsoft.com/en-us/…`.
- **Placeholders:** use `SUBDOMAIN` (and `SHORTCODE` for the setup user) like the official docs. In code blocks, mark them with Expressive Code, e.g. ` ```text "SUBDOMAIN" `.

### “Last checked” dates

Every page has `lastVerified: YYYY-MM-DD` in its frontmatter; the footer shows it as “Last checked against the official docs”. When you re-check a page against the official documentation, update the date.

## Checks

Every pull request and every push to `main` runs `.github/workflows/ci.yml`: the type check and a production build, which fails on any broken internal link or heading anchor (`starlight-links-validator`).

## Design notes

`PRODUCT.md` records who the guide is for and its constraints. `DESIGN.md` (with its machine-readable sidecar `.impeccable/design.json`) documents the visual system: the “sketch explainer” direction (cream paper, light theme only, marker headlines, yellow/pink/teal highlighters, wobbly hand-drawn borders and diagrams, and a doodled rocket that launches in the logo, idles on the pad while you wait and marks tips and cautions), its tokens, type, components and rules. The opening comment of `src/components/overrides/Hero.astro` summarizes it.

## License

[MIT](LICENSE) © Edin Cenanovic
