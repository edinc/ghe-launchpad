---
# Weekly AI review of the English guide against the official docs it links to. Opens one issue
# (labels: documentation, docs-check) when something is outdated, nothing otherwise.
# Needs the COPILOT_GITHUB_TOKEN secret: a fine-grained personal access token with the
# "Copilot Requests" account permission. After editing, recompile: see AGENTS.md.
on:
  schedule: weekly on monday
  workflow_dispatch:
  # One open report at a time: skip the run, and its AI costs, until the last report is closed.
  skip-if-match: "is:issue is:open label:docs-check"

permissions:
  contents: read
  issues: read
  copilot-requests: none # personal repository: Copilot usage is billed to COPILOT_GITHUB_TOKEN's owner

# Stop a run before it spends more than 300 AI credits (about $3) in total: 250 for the review here,
# 50 for the threat detection that checks its report (safe-outputs.threat-detection below).
max-ai-credits: 250

tools:
  github:
    mode: gh-proxy
    toolsets: [issues]

network:
  allowed:
    - defaults
    - docs.github.com
    - learn.microsoft.com

safe-outputs:
  create-issue:
    title-prefix: "[docs check] "
    labels: [documentation, docs-check]
    max: 1
  threat-detection:
    max-ai-credits: 50
---

# Weekly docs check

GHE Launchpad, this repository, is a community walkthrough for setting up GitHub Enterprise Cloud with data residency (GHE.com): Enterprise Managed Users with Microsoft Entra ID, billing through Azure, and GitHub Copilot. Every page is based on the official GitHub and Microsoft documentation it links to. Find statements in the guide that no longer match that documentation, so a maintainer can fix them.

## Read the guide

- The English pages are in `src/content/docs/`, without the `de/` folder. The setup steps 0 to 10 are in `steps/`, the overview pages in `start/`; `index.mdx` and `resources/` summarize them.
- Each step's roles, time, waits, prerequisites and "done when" checkpoints are in `src/data/steps.ts` (the `en` texts).
- `src/content/docs/de/` translates the English pages file by file. Don't review it, but name the matching German file for every finding.

## Compare it with the official docs

For each English page, read the official pages it links to and compare the concrete facts:

- click paths and the names of buttons, menus, tabs and settings
- required roles, permissions and prerequisites
- numbers and limits (trial length, licenses, minutes, waiting times), regions and plans
- URLs, hostnames, CLI commands and IDE settings
- the order of steps, and what the guide says is or isn't possible

Fetch the official pages with `curl`:

- docs.github.com as Markdown: `curl -sL "https://docs.github.com/api/article/body?pathname=<path>"`, where `<path>` is the link's own path without the `#anchor`, for example `/en/enterprise-cloud@latest/admin/data-residency/about-github-enterprise-cloud-with-data-residency`. Keep the version the link uses. If the page isn't found, it moved or was removed: report the link.
- learn.microsoft.com: `curl -sL "<link>"`, then read the article text.

Work page by page. Official pages are long: use `grep` to find the parts that matter instead of reading them whole.

## Don't report

- Wording, style, or detail the guide leaves out on purpose: it's a short walkthrough, and the official docs stay the source of truth.
- Step 5's handoff: the guide says the customer's Microsoft or GitHub contact enables Copilot. That's intended.
- The reference videos (`src/data/videos.ts`); they're labeled as recorded in October 2025.
- Anything you can't back with a quote from the official docs.
- Findings a maintainer already rejected. List the closed reports with `gh issue list --label docs-check --state closed --limit 20 --json title,body,stateReason,closedAt` and skip findings from reports closed in the last 90 days with the state reason `NOT_PLANNED`. Read only their titles and bodies, not the comments.

## Report

If at least one statement is outdated or wrong, create one issue:

- Title: a short summary of the most important finding. The "[docs check] " prefix is added for you.
- Body: one section per guide page, with the English and German file paths. For each finding: what the guide says (quote), what the official docs say now (quote and link), and the change you suggest.
- End the body with: "After fixing, update `lastVerified` on the changed pages in both languages (see AGENTS.md)."

If everything still matches, call `noop` with one sentence, for example: "Checked 11 step pages against 35 official pages: nothing outdated."
