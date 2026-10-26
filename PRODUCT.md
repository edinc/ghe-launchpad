# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** IT/platform administrators and project leads at organizations evaluating GitHub Enterprise Cloud with data residency (GHE.com) in a proof of concept, often in the EU/Germany. They work through the setup on their own after receiving the link from their Microsoft/GitHub contact.
- **Supporting roles who are pulled in for single steps:** the future enterprise owner, a Microsoft Entra Global Administrator, the Azure subscription Owner, and finally the developers who sign in from their IDE/CLI.
- **Sender:** the Microsoft/GitHub contact (the maintainer) who shares one generic link instead of walking every customer through the same setup on a call.

## Product Purpose

A self-service, visual walkthrough for the recurring setup: GHE.com trial with data residency, the setup user, connecting an Azure subscription for billing, activating the enterprise, Copilot enablement (a handoff: the customer's Microsoft/GitHub contact triggers it), OIDC SSO and SCIM provisioning with Entra ID (Enterprise Managed Users), enterprise teams, Copilot license assignment, and developer sign-in. Success: a customer gets from "no enterprise" to "developers using Copilot on SUBDOMAIN.ghe.com" without a hand-holding call.

## Positioning

One ordered, role-aware path that stitches the scattered official GitHub and Microsoft documentation and reference videos into a single walkthrough: who does what, in which order, how long it takes and what to wait for, with click paths, diagrams and "done when" checkpoints. It covers two paths: A, the full platform (code on GitHub plus Copilot), and B, Copilot only (code stays in Azure DevOps, GitLab, Bitbucket etc.; enterprise without organizations).

## Operating Context

- Readers switch between this guide and the GitHub (SUBDOMAIN.ghe.com), Microsoft Entra admin center and Azure portal UIs while executing steps; steps span days because of provisioning and approval waits.
- GitHub's UI is English-only; the Entra admin center and Azure portal follow the user's language setting.
- The guide is general: placeholders such as `SUBDOMAIN` stand for customer values, as in the official docs.

## Capabilities and Constraints

- English and German from day one (German uses formal "Sie"; GitHub UI labels stay in English).
- No screenshots: visuals are diagrams and embedded reference videos only (privacy-friendly, click-to-load YouTube embeds).
- Hosted on GitHub Pages at https://edinc.github.io/ghe-launchpad/ (no custom domain); built with Astro Starlight.
- No backend, no analytics, no cookies.
- No customer personalization and no handoff email templates (explicitly dropped by the maintainer).
- Copilot enablement is described generically: "your Microsoft or GitHub contact enables Copilot for your enterprise"; the internal process is not described.
- Official documentation is the source of truth; pages carry "last verified" dates and link to the language-matched official docs.

## Brand Commitments

- Name: "GHE Launchpad" (repo `ghe-launchpad`). The whole enterprise is being set up; Copilot is only one part, so the name is not Copilot-centric.
- Independent community guide: every page states it is not official GitHub or Microsoft documentation.

## Evidence on Hand

- Reference videos: Microsoft "Setting up GitHub Copilot for your Company" series (recorded Oct 2025) and GitHub's official Azure billing video.
- Official GitHub Docs and Microsoft Learn pages (linked, not copied).
- No customer logos, testimonials, metrics or screenshots exist; none may be invented.

## Product Principles

1. Sequence over reference: always answer "what do I do next, and who has to do it?"
2. Show waits and handoffs honestly (provisioning hours, admin consent, Copilot enablement).
3. Defer to the official docs; never contradict them, link to them at every step.
4. Equal quality in English and German.
5. Respect privacy: nothing loads from third parties until the reader asks for it.

## Accessibility & Inclusion

- Readable on mobile and printable; keyboard-accessible; diagrams carry text alternatives; light theme only (no dark mode or theme switch).
