# Contributing to GHE Launchpad

Thanks for helping! GHE Launchpad is a community guide for setting up GitHub Enterprise Cloud with data residency (GHE.com). Most contributions are small: a click path that changed, a link that moved, a step that could be clearer.

## Report something outdated or wrong

The products change faster than any guide. If a page no longer matches what you see, [open an "Outdated or wrong content" issue](https://github.com/edinc/ghe-launchpad/issues/new/choose) with the page, what changed and, ideally, a link to the official documentation that shows it.

Questions about your own setup belong with your Microsoft or GitHub contact or [GitHub Support](https://support.github.com), not in this repository's issues.

## Make a change

1. Fork the repository and create a branch.
2. Set up and run the site locally (Node.js 22.22 or later):
   ```sh
   npm ci
   npm run dev       # http://localhost:4321/ghe-launchpad/
   ```
3. Make your change. Content changes follow the rules below.
4. Run the checks:
   ```sh
   npm run check          # type check
   npm run build          # also validates every internal link
   npm test               # unit and component tests
   npm run test:e2e       # UI tests (run `npx playwright install chromium` once)
   ```
5. Open a pull request and fill in the checklist. CI runs the same checks.

For larger changes (new pages, design changes), please open an issue first so we can agree on the approach.

## Content rules

- **Both languages:** every page exists in English (`src/content/docs/`) and German (`src/content/docs/de/`, same file name). Change both. If you can't write the German part, say so in the pull request and we'll help.
- **"Last checked" date:** when you re-check a page against the official documentation, update `lastVerified` in both languages.
- **Links:** internal links include the base path and stay in the page's language (`/ghe-launchpad/…` and `/ghe-launchpad/de/…`). Link to the official docs in the page's language.
- **German:** formal "Sie". GitHub's interface is English-only, so GitHub button and menu names stay in English (bold).
- **Keep it light:** short steps, click paths and checkpoints rather than long paragraphs. No screenshots.

More detail: [README](README.md#updating-content), [DESIGN.md](DESIGN.md) for the visual system, and [AGENTS.md](AGENTS.md) for the full workflow we use, including AI-assisted reviews.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Be kind and constructive.

## Security

Please don't report security problems in public issues. See [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
