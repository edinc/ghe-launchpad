# GHE Launchpad

[![Tests](https://img.shields.io/github/actions/workflow/status/edinc/ghe-launchpad/ci.yml?branch=main&event=push&label=tests)](https://github.com/edinc/ghe-launchpad/actions/workflows/ci.yml?query=branch%3Amain)
[![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fedinc.github.io%2Fghe-launchpad%2Fbadges%2Fcoverage.json&label=coverage)](https://github.com/edinc/ghe-launchpad/actions/workflows/ci.yml?query=branch%3Amain)
[![Deployment](https://img.shields.io/github/deployments/edinc/ghe-launchpad/github-pages?label=deployment)](https://github.com/edinc/ghe-launchpad/actions/workflows/deploy.yml)
[![Docs last checked](https://img.shields.io/endpoint?url=https%3A%2F%2Fedinc.github.io%2Fghe-launchpad%2Fbadges%2Fdocs-checked.json&label=docs%20last%20checked)](https://edinc.github.io/ghe-launchpad/)
[![Links](https://img.shields.io/github/actions/workflow/status/edinc/ghe-launchpad/link-check.yml?label=links)](https://github.com/edinc/ghe-launchpad/actions/workflows/link-check.yml)
[![License: MIT](https://img.shields.io/github/license/edinc/ghe-launchpad)](LICENSE)

A visual, self-service guide to setting up **GitHub Enterprise Cloud with data residency (GHE.com)**: Enterprise Managed Users with Microsoft Entra ID, billing through Azure, and GitHub Copilot. Send the link to a customer, and they can do the setup on their own, in English or German.

**[edinc.github.io/ghe-launchpad](https://edinc.github.io/ghe-launchpad/)** · [Deutsch](https://edinc.github.io/ghe-launchpad/de/)

> [!NOTE]
> An independent community guide, not official GitHub or Microsoft documentation. The official docs are the source of truth, and every step links to them.

## Run it locally

```sh
npm ci
npm run dev   # http://localhost:4321/ghe-launchpad/
```

Needs Node.js 22.23.4 or later. Built with [Astro Starlight](https://starlight.astro.build).

## How it stays current

<!-- Source: .github/assets/how-it-stays-current.excalidraw. Edit it in Excalidraw, then export it as PNG at 2x scale. -->
![On every change, a pull request runs CI (type check, build, unit and UI tests), gets merged to main, and is deployed to GitHub Pages once CI is green on main. Every Monday, the link check and the AI docs check open a broken-links or docs-check issue that gets fixed in a pull request, and Dependabot opens update pull requests.](.github/assets/how-it-stays-current.png)

- **CI** ([`ci.yml`](.github/workflows/ci.yml)): type check, build (which also validates every internal link), unit tests with at least 70% coverage, and Playwright UI tests, on every pull request and on `main`.
- **Deploy** ([`deploy.yml`](.github/workflows/deploy.yml)): publishes `main` to GitHub Pages once CI has passed.
- **Link check** ([`link-check.yml`](.github/workflows/link-check.yml)): checks every external link and video, and opens a `broken-links` issue.
- **AI docs check** ([`docs-check.md`](.github/workflows/docs-check.md)): a [GitHub Agentic Workflow](https://github.github.com/gh-aw/) in which GitHub Copilot compares the English pages with the official docs they link to, and opens a `docs-check` issue for anything outdated. It pauses while a report is open and stops at about $3 per run. Needs the `COPILOT_GITHUB_TOKEN` secret.
- **Dependabot** ([`dependabot.yml`](.github/dependabot.yml)): grouped dependency updates.
- **Copilot setup steps** ([`copilot-setup-steps.yml`](.github/workflows/copilot-setup-steps.yml)): prepares Copilot cloud agent sessions that run on GitHub Actions like CI (Node.js, dependencies, Chromium) before the agent starts.

## Contributing

Found something outdated? [Open an issue](https://github.com/edinc/ghe-launchpad/issues/new/choose).

Pages live in `src/content/docs/` (English) and `src/content/docs/de/` (German): change both, and update `lastVerified` when you re-check a page against the official docs. More in [CONTRIBUTING.md](CONTRIBUTING.md); our review workflow is in [AGENTS.md](AGENTS.md), security reports go through [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE). Created and maintained by [Edin Cenanovic](https://edincenanovic.com).
