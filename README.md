# GHE Launchpad

A visual, self-service walkthrough for setting up **GitHub Enterprise Cloud with data residency (GHE.com)**: Enterprise Managed Users with Microsoft Entra ID, billing through an Azure subscription, and GitHub Copilot. In English and German.

> [!NOTE]
> Work in progress: the guide arrives in a series of pull requests.

## Local development

Requires Node.js 22.22 or later (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321/ghe-launchpad/
npm run build     # static site in dist/, also validates internal links
npm run preview   # serve the build locally
```

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## License

[MIT](LICENSE) © Edin Cenanovic
