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

## Contributing

Found something outdated? [Open an issue](https://github.com/edinc/ghe-launchpad/issues/new/choose).

Pages live in `src/content/docs/` (English) and `src/content/docs/de/` (German): change both, and update `lastVerified` when you re-check a page against the official docs. More in [CONTRIBUTING.md](CONTRIBUTING.md); our review workflow is in [AGENTS.md](AGENTS.md), security reports go through [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE). Created and maintained by [Edin Cenanovic](https://edincenanovic.com).
