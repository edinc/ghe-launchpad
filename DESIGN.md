---
name: GHE Launchpad
description: "The GHE.com setup sketched the way a colleague draws it on a whiteboard: paper, marker ink and three highlighters."
colors:
  hl-yellow: "#ffe84d"
  hl-teal: "#2dd4bf"
  hl-pink: "#ff6fae"
  hl-lilac: "#c4b5fd"
  hl-orange: "#ffb86b"
  hl-pencil: "#d8d2c4"
  on-hl: "#111111"
  paper: "#fff8e8"
  paper-card: "#fffdf6"
  paper-sunk: "#f8edd2"
  ink: "#111111"
  ink-2: "#2b2a27"
  ink-3: "#57544d"
  ink-4: "#9a9486"
  sk-muted: "#a19b8d"
  sk-muted-text: "#6f6b62"
  teal-ink: "#0d6e66"
  pink-ink: "#b0145a"
  link-hl: "rgba(45, 212, 191, 0.5)"
  strong-hl: "rgba(255, 232, 77, 0.85)"
  grid-dot: "rgba(17, 17, 17, 0.075)"
  halftone: "rgba(17, 17, 17, 0.42)"
typography:
  display:
    fontFamily: "Permanent Marker, Marker Felt, Comic Sans MS, cursive"
    fontSize: "3.35rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Permanent Marker, Marker Felt, Comic Sans MS, cursive"
    fontSize: "2.6rem"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "0.005em"
  title:
    fontFamily: "Permanent Marker, Marker Felt, Comic Sans MS, cursive"
    fontSize: "1.9rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.01em"
  card-title:
    fontFamily: "Permanent Marker, Marker Felt, Comic Sans MS, cursive"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.2
  subtitle:
    fontFamily: "Patrick Hand SC, Patrick Hand, Comic Sans MS, cursive"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.25
  label-lg:
    fontFamily: "Patrick Hand SC, Patrick Hand, Comic Sans MS, cursive"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1
  label:
    fontFamily: "Patrick Hand SC, Patrick Hand, Comic Sans MS, cursive"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.25
  label-sm:
    fontFamily: "Patrick Hand SC, Patrick Hand, Comic Sans MS, cursive"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
  key:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 600
rounded:
  wobble: "18px 14px 20px 12px / 12px 20px 14px 18px"
  wobble-sm: "10px 14px 9px 13px / 13px 9px 14px 10px"
  blob: "52% 48% 55% 45% / 48% 55% 45% 52%"
  sheet: "14px 18px 12px 16px"
  code-inline: "6px 8px 6px 9px"
  code-frame: "14px"
  focus: "6px"
  pill: "999px"
  circle: "50%"
components:
  button-primary:
    backgroundColor: "{colors.hl-yellow}"
    textColor: "{colors.on-hl}"
    typography: "{typography.label-lg}"
    rounded: "14px 18px 13px 17px / 17px 13px 18px 14px"
    padding: "0.78rem 1.35rem 0.72rem"
  button-secondary:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.label-lg}"
    rounded: "14px 18px 13px 17px / 17px 13px 18px 14px"
    padding: "0.78rem 1.35rem 0.72rem"
  callout:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.wobble}"
    padding: "1rem 4.6rem 1.05rem 1.25rem"
  callout-title:
    textColor: "{colors.on-hl}"
    padding: "0.05em 0.3em"
  step-intro:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.wobble}"
    padding: "1.3rem 1.4rem 1.2rem"
  step-number:
    backgroundColor: "{colors.hl-teal}"
    textColor: "{colors.on-hl}"
    rounded: "{rounded.blob}"
    size: "4rem"
  step-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.pill}"
    padding: "0.1rem 0.7rem 0.1rem 0.2rem"
  click-path-key:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.key}"
    rounded: "8px 11px 9px 12px"
    padding: "0.18rem 0.6rem"
  click-path-key-destination:
    backgroundColor: "{colors.hl-yellow}"
    textColor: "{colors.on-hl}"
  click-path-key-destination-entra:
    backgroundColor: "{colors.hl-teal}"
    textColor: "{colors.on-hl}"
  click-path-key-destination-azure:
    backgroundColor: "{colors.hl-pink}"
    textColor: "{colors.on-hl}"
  role-tag:
    backgroundColor: "{colors.hl-yellow}"
    textColor: "{colors.on-hl}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.wobble-sm}"
    padding: "0.18rem 0.6rem 0.16rem 0.45rem"
  role-tag-helper:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  done-when:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.wobble}"
    padding: "1rem 1.3rem 1.1rem 2.6rem"
  doc-link:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "12px 16px 11px 15px"
    padding: "0.65rem 0.95rem"
  video-card:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "18px 14px 20px 16px"
    padding: "1rem 1.3rem 1rem 1rem"
  path-card:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.wobble}"
    padding: "1.3rem 1.4rem 1.2rem"
  sticky-note:
    backgroundColor: "{colors.hl-yellow}"
    textColor: "{colors.on-hl}"
    rounded: "2px 3px 22px 3px"
    padding: "1.5rem 1.25rem 1.3rem"
  tab-selected:
    backgroundColor: "{colors.hl-yellow}"
    textColor: "{colors.on-hl}"
    rounded: "12px 14px 0 0"
    padding: "0.35rem 0.9rem"
  code-inline:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.code-inline}"
    padding: "0.05em 0.36em"
  sidebar-link-current:
    textColor: "{colors.on-hl}"
    typography: "{typography.label}"
    rounded: "{rounded.wobble-sm}"
---

# Design System: GHE Launchpad

## Overview

**Creative North Star: "The Sketch Explainer"**

GHE Launchpad explains a multi-day enterprise setup the way a colleague sketches it on a whiteboard: one hand-drawn route of 11 steps, who does what, and what to wait for. The page is cream notebook paper (the site is light-only), everything structural is drawn in marker ink, and three highlighters (yellow, teal, pink) carry the meaning. Borders wobble, shadows are hard offsets, diagrams are rough.js sketches, and an original doodled rocket launches on the home page, idles on the pad while you wait, and marks every note, tip and caution.

The sketch is the frame, never the content. Reading text stays in Inter at a 70ch measure, menu paths the reader must match stay in crisp Inter keys, and the wobble filter only ever touches border copies. Density is deliberately low: answers are chunked into drawn objects (a step intro card for who, how long and what to wait for; click-path chips; note-paper checkpoints; doc-link cards) instead of paragraphs. The bar is "modern and intuitive"; the confirmed failure mode is a page that feels "too dense and text-heavy, like reading raw docs", the wall-of-docs default this world refuses.

Every flourish is a code. A highlighter's color names a place, role or state; the rocket's mood names the callout type; a colored shadow repeats that meaning; a blob with a marker numeral is always a step. Decoration that carries none of these meanings does not belong. Visuals are diagrams and click-to-load videos only, never screenshots, and the only mark is the original rocket.

**Key Characteristics:**
- Paper grounds with a 24px dot grid; marker-ink borders (1.5–2.5px) that wobble through one shared SVG filter.
- Three working highlighters plus three role-only tints; text on a highlighter is always near-black.
- Three pens: Permanent Marker for headlines and numerals, Patrick Hand SC for labels and margin notes, Inter for reading.
- Depth from hard, zero-blur offset shadows and one halftone dot shadow, never from blur.
- Hand-made everything: rough.js diagrams with fixed seeds, doodled inline-SVG icons, highlighter swipes, wavy rules, tilted stickies.
- Light theme only: one cream-paper palette, no dark mode and no theme switch.
- Small, physical motion (lift, press, swipe-in, lift-off, draw-in), with every entrance gated behind reduced-motion.

## Colors

Paper and marker ink, with three highlighters that each have one job and three extra tints reserved for people.

There is one palette, the cream notebook: the site is light-only, with no dark mode and no theme switch. Each key is the CSS custom property of the same name (`--paper`, `--ink`, …).

### Primary
- **Highlighter Yellow** (#ffe84d, `hl-yellow`): "act here, this is the answer". The primary sketch button, the selected tab, the destination key of a GitHub click path, the `<details>` "+" badge, the H1 underline, text selection, yellow stickies, the focused box in a per-step system map, rocket flames and sparkles, the video play disc. As a translucent band it marks `<strong>`: **Emphasis Band** (`strong-hl` rgba(255, 232, 77, 0.85)).

### Secondary
- **Highlighter Teal** (#2dd4bf, `hl-teal`): structure and wayfinding. Step-number blobs, the brush stroke under every H2 and sidebar group, link underlines, the Entra admin role, Path A, note callouts, the ruled lines of note paper and the checklist, the rocket's window and fins.
- **Link Band** (`link-hl` rgba(45, 212, 191, 0.5)): the highlighter under markdown links and the current table-of-contents entry.
- **Teal Fineliner** (#0d6e66, `teal-ink`): teal that must read as text or line on paper: the dashed focus outline, the "↗" on doc links, the "→" bullets under "Have ready", Starlight's accent and text accent.

### Tertiary
- **Highlighter Pink** (#ff6fae, `hl-pink`): "you are here" and "careful". The current page in the sidebar, the hero swipe, caution and danger callouts, the Azure owner role, Path B, emphasised and focused flows in diagrams, the margin line of note-paper checkpoints, the active code-tab indicator, the video card stripes, the rocket's flame core, the footer asterisk.
- **Pink Fineliner** (#b0145a, `pink-ink`): handwritten margin notes: the hero effort note, "Start here", the parallel-steps note and finish label on the route, "← swipe →" hints, warnings inside diagrams ("not github.com!").

### Role Highlighters
- **Lilac** (#c4b5fd, `hl-lilac`): the "your Microsoft or GitHub contact" role and the waiting state (wait callouts take its swipe and shadow); also the Path A / Path B tags on checkpoints.
- **Apricot** (#ffb86b, `hl-orange`): the developers role, nothing else.
- **Pencil Grey** (#d8d2c4, `hl-pencil`): the project lead role; it is the default value of `--role`.

### Neutral
- **Cream Notebook** (#fff8e8, `paper`): page, header and sidebar ground, overlaid with the **Dot Grid** (`grid-dot`, 1.1px dots every 24px).
- **Card Stock** (#fffdf6, `paper-card`): every card, panel, chip and code block, and the halo behind diagram labels.
- **Pressed Paper** (#f8edd2, `paper-sunk`): inline code, table headers, code tab bars, hover fills.
- **Marker Ink** (#111111, `ink`): borders, offset shadows, headings, diagram outlines.
- **Graphite** (#2b2a27, `ink-2`): body text.
- **Pencil Note** (#57544d, `ink-3`): captions, meta, legends, the "In GitHub" labels, soft diagram labels.
- **Dashed Rule** (#9a9486, `ink-4`): dashed dividers, step connectors, the route spine, inline-code borders. Lines only, never text.
- **Faded Sketch** (#a19b8d, `sk-muted`): out-of-focus diagram strokes. Lines only, never text.
- **Faded Label** (#6f6b62, `sk-muted-text`): out-of-focus diagram labels, still at 4.5:1 or better.
- **Highlighter Ink** (#111111, `on-hl`): text and marks on any highlighter fill.
- **Halftone** (`halftone`: ink at 42%): the dot shadow behind the step intro card.

### Named Rules
**The Three Highlighters Rule.** Yellow means act or answer, teal means structure and links, pink means you-are-here or careful. Lilac, apricot and pencil exist only for roles (lilac also for waiting); never use them as general accents, and never add a fourth brand color.

**The Same Place, Same Color Rule.** GitHub and GHE.com are yellow, Microsoft Entra is teal, Azure is pink: in role tags (enterprise owner, Entra admin, Azure owner), the destination key of a click path, and diagram fills. Path A is teal and Path B is pink, everywhere.

**The Dark Ink on Highlighter Rule.** Anything set on a highlighter fill uses `on-hl`; a highlighter never carries light text. The swipes multiply into the paper like real ink.

## Typography

**Display Font:** Permanent Marker (with Marker Felt, Comic Sans MS, cursive)
**Body Font:** Inter Variable (with Inter, -apple-system, Segoe UI, Roboto, sans-serif)
**Label Font:** Patrick Hand SC (with Patrick Hand, Comic Sans MS, cursive)

**Character:** A fat marker for what you would write big on the whiteboard, a neat small-caps hand for the notes beside it, and a calm, precise grotesque for everything a reader has to read in full or match letter for letter.

### Hierarchy
- **Display** (Permanent Marker 400, 3.35rem, 2.55rem below 50rem, line-height 1.1, +0.005em): the home hero headline only; the key words sit on the pink swipe (written as `==text==` in the hero title).
- **Headline** (Permanent Marker 400, 2.6rem, 2.05rem below 50rem, 1.14, +0.005em): page H1, underlined with yellow highlighter (0.2em thick, 0.18em offset, skip-ink off); step pages prefix it with a numeral blob.
- **Title** (Permanent Marker 400, 1.9rem, 1.35, +0.01em): H2 sections, each sitting on a teal brush stroke 0.42em tall, with 3rem above.
- **Card title** (Permanent Marker 400, 1.35rem, 1.2): sticky and checklist titles and the site title; the same voice runs path-card names (1.4rem), the "Hands-on" fact (1.45rem) and video titles (1.22rem).
- **Subtitle** (Patrick Hand SC 400, 1.5rem, 1.25): H3; H4 drops to 1.25rem.
- **Label large** (Patrick Hand SC 400, 1.35rem, line-height 1): sketch buttons; prev/next titles at 1.3rem.
- **Label** (Patrick Hand SC 400, 1.15rem, 1.25): sidebar links, the TOC heading, wait facts; callout titles (1.25rem), details summaries (1.2rem), tabs (1.12rem) and table headers (1.1rem) sit in the same band.
- **Label small** (Patrick Hand SC 400, 1.08rem, 1.15): role tags and step chips; legends, fact labels and meta run 0.98–1.05rem, the "In GitHub" click-path label 1rem.
- **Body** (Inter 400, 1.0625rem, 1.7, max 70ch): paragraphs and lists in Graphite; `<strong>` is weight 650 on the Emphasis Band.
- **Body small** (Inter 400, 0.95rem): video captions and table cells; figcaptions (0.92rem), card bullet lists and sticky bodies (0.97–0.98rem) sit beside it; route meta and privacy notes drop to 0.82–0.85rem.
- **Key** (Inter 600, 0.92rem): click-path keys, the one place menu labels from GitHub, Entra and Azure appear; doc-link cards use Inter 550.
- **Code:** inline at 0.88em on Pressed Paper; code blocks at 0.9rem.

### Named Rules
**The Three Pens Rule.** Marker for headlines, card titles and numerals; hand for labels, buttons, navigation, legends and margin notes; Inter for anything read in full or matched exactly (body, captions, menu paths). Never set a paragraph, or a UI label the reader must find on screen, in a hand font.

**The One-Weight Hand Rule.** Permanent Marker and Patrick Hand SC load at 400 only, and every heading forces weight 400. The hand fonts get emphasis from size, highlighter and underline, never from bold. Patrick Hand SC is small caps by design; nothing uses `text-transform`.

## Layout

GHE Launchpad lives in Starlight's docs frame (header, sidebar, table of contents, one content column) with three overrides: the home hero, the page title and the footer. The paper and its dot grid run edge to edge; content keeps Starlight's default column width, widened to 64rem only on the journey page. Paragraphs, lists and figcaptions cap at 70ch; the hero tagline at 46ch. Custom components opt out of markdown typography with `.not-content`, so the link band, the H2 brush and the 70ch cap never leak into drawn objects.

Rhythm is set per component in rem, not from a spacing scale: H2 sections open 3rem below the previous block; drawn components take block margins of 1–2.5rem (callouts 2rem above, to clear the overhanging rocket); panels pad 1–1.4rem; chips sit 0.3–0.6rem apart.

The home page is a two-column hero (1.75fr / 1fr): marker headline, tagline and buttons on the left; the launching rocket and its handwritten effort note on the right. Below 50rem it stacks, with the rocket shrunk to 5.5rem beside its note above the headline. The full route board follows directly.

**Breakpoints:**
- **72rem:** the route board is a two-row snake board at or above, a numbered vertical spine below; the journey's scroll hint shows only below.
- **50rem:** the hero stacks; the H1 drops to 2.05rem and the hero headline to 2.55rem; page-title numerals shrink to 2.8rem.
- **44rem:** the full system map swaps to the mini map; path cards stack.
- **42rem:** the step intro card stacks, its map centered at max 22rem.
- **40rem:** role-roster rows stack.
- **36rem:** wide diagrams add a right-edge paper fade and a "← swipe →" hint.
- **32rem:** the step intro facts (effort, waiting) stack in one column.

**Print:** buttons, videos, step-intro maps, footer links and the route trail disappear; checklist steps, step intro cards and callouts drop their shadows and print on white; checklist steps never split across pages.

### Named Rules
**The Hand-Placed Tilt Rule.** Only small stuck-on objects tilt, by a few degrees: the logo (−6°), step numerals (−5°), rockets (4° to 6°), margin notes (−2° to −5°), stickies (−1.6° to 1.2°); hover and open states may tip a numeral or badge a little further (−6° to −8°). Framed panels, tables, code and body text never rotate.

**The Wide Frame, Narrow Text Rule.** When a surface needs width (route board, swimlanes, diagrams), the frame grows or scrolls sideways inside itself; reading text stays at 70ch.

## Elevation & Depth

Depth is cut paper on a desk, not light in space. Surfaces separate by Card Stock on paper plus a Marker Ink border; when something must stand off the page it gets a solid, zero-blur offset falling down-right (the y offset equal to or slightly larger than x), in Marker Ink or in the highlighter that names its meaning. The only other depth device is the halftone: a 5px dot grid offset 8px behind the step intro card. Nothing in the system uses a blur radius, and the printable surfaces (checklist, step intro, callouts) drop their shadows on paper.

### Shadow Vocabulary
- **Chip** (`box-shadow: 2px 3px 0 0 var(--ink)`): click-path keys and numbered-step bullets; swimlane "leads" marks use 2px 2px.
- **Badge** (`box-shadow: 3px 4px 0 0 var(--ink)`): route-board and page-title numerals; doc-link cards at rest.
- **Button** (`box-shadow: 4px 5px 0 0 var(--ink)`): sketch buttons and prev/next cards at rest.
- **Panel** (`box-shadow: 5px 6px 0 0 var(--ink)`): framed panels: video card, journey frame, role roster, code frames; doc links on hover.
- **Lift** (`box-shadow: 6px 7px 0 0 var(--ink)` with `transform: translate(-2px, -2px)`): hover on buttons and prev/next; route numerals lift to 5px 7px and tilt −6°.
- **Press** (`box-shadow: 1px 1px 0 0 var(--ink)` with `transform: translate(3px, 4px)`): `:active` on buttons.
- **Meaning** (`box-shadow: 6px 6px 0 0 var(--callout-shadow)`; path cards `6px 7px 0 0 var(--path-color)`): callouts in their type color (teal note, yellow tip, pink caution, lilac wait, ink danger) and path cards in their path color (teal A, pink B). Starlight's fallback asides use 5px 6px in teal, yellow or pink.
- **Sticky** (`box-shadow: 3px 5px 0 0 rgba(17, 17, 17, 0.85)`): sticky notes.
- **Halftone** (`radial-gradient(var(--halftone) 1px, transparent 1.3px)` at 5px × 5px, inset 8px −8px −8px 8px behind the card): the step intro card only.

### Named Rules
**The Hard Offset Rule.** Shadows are solid and zero-blur, always falling down-right. If it needs a blur, it doesn't belong in this world.

**The Lift and Press Rule.** Clickable drawn objects lift up-left on hover while their shadow grows, then press down-right into the shadow on `:active`, at 160ms on `--ease-out`. Static panels (callouts, step intro, checkpoints, stickies) never move.

## Shapes

Everything is drawn by hand, so no two corners match and no line is ruler-straight.

**Corners.** Framed panels (callouts, step intro, path cards, roster, checklist steps, checkpoints, journey frame, prev/next, asides, footer) use the asymmetric elliptical `wobble` radius. Small sticker shapes (role tags, lane marks, path tags, sidebar and TOC highlights, the header's search and selects) use `wobble-sm`. A few components carry their own hand-cut corners: the sketch button (14px 18px 13px 17px / 17px 13px 18px 14px), doc links (12px 16px 11px 15px), click-path keys (8px 11px 9px 12px), the video card (18px 14px 20px 16px), tables and `<details>` (`sheet`), inline code (`code-inline`), folder tabs (12px 14px 0 0) and the sticky's curled corner (2px 3px 22px 3px). Every step numeral sits in a `blob`; dots and the small step references in step chips and the role roster are true circles; step chips are pills. Only Expressive Code frames keep a plain 14px corner (`code-frame`), and the focus outline rounds at 6px.

**Lines.** Three ink weights: 1.5px for tags, chips, dots, small numerals and inline-code borders; 2px for panels, tables, details, tabs, click keys, code frames and header controls; 2.5px for sketch buttons, path cards, route and page-title numerals, the danger callout and the video card. Inside a component, divisions are dashed `ink-4` lines (1.5px rows, 2px dividers, a 2.5px route spine), and dashed outlines also mean "helps" on role tags, dots and lane marks. Page-level dividers are never straight: the header's bottom edge and `<hr>` (at 50% opacity) are a hand-drawn wavy rule (`--rule`, a 2.2-stroke Marker Ink wave).

**The wobble filter.** One SVG filter, `#sk-wobble`, is defined once in the footer override (`feTurbulence` fractal noise, baseFrequency 0.035, 2 octaves, seed 7, into `feDisplacementMap` scale 3.4 on the R/G channels, filter region −4%/−8%, 108% × 116%). Wobble-listed components (step intro, callout, path card, roster, checklist step, checkpoint, video box, journey frame, sketch button, prev/next, markdown `<details>`, doc links) get `position: relative` and a transparent real border; a `::before` copy at `inset: calc(-1 * var(--bw, 2px))` draws `var(--bw, 2px) solid var(--ink)` with `border-radius: inherit`, `filter: url(#sk-wobble)` and `pointer-events: none`. `--bw` is 2.5px for path cards, sketch buttons, the danger callout and the video box.

**Highlighter marks.**
- **Swipes** (`--swipe-pink`, `--swipe-yellow`, `--swipe-teal`, `--swipe-lilac`): a 200 × 40 SVG brush with ragged ends, two fill layers at 85% and 60% and two white streaks at 32%, stretched with `preserveAspectRatio='none'` behind `on-hl` text: hero key words (`0 55% / 100% 86%`, animated in), the current sidebar page, callout titles by type, path-card names.
- **Brush underline** (`--brush-teal`): a 200 × 14 tapered stroke under every H2 (0.42em tall) and sidebar group label (0.4em).
- **Bands:** the Link Band sits 0.34em tall at the baseline of markdown links and floods to 88% on hover (220ms); the Emphasis Band covers 56% to 90% of the line behind `<strong>`.
- **Underlines:** secondary links take `underline var(--hl-teal)` at 0.16–0.18em with a 0.16–0.2em offset; the H1 takes yellow at 0.2em; hovered titles underline in teal (pink on video titles).

**Doodles.** Icons are inline SVG drawn for this site, round caps and joins, Marker Ink strokes of 1.8–3 (up to 4.5 on the footer asterisk): click-path arrows, the hourglass, the wobbly checkbox, the video play blob, the hero's motion ticks, the route's curved arrow. They are always `aria-hidden` with `focusable="false"`.

### Named Rules
**The Wobble the Border, Not the Content Rule.** `#sk-wobble` only ever filters the `::before` border copy; text, fills, shadows and focus outlines stay crisp. Wobble-listed components reserve `::before` for that copy and put any other decoration on `::after` (the halftone, the doc-link "↗").

**The Blob Numeral Rule.** A step's own number (sidebar, numbered steps, page title, route board, swimlanes, checklist) always sits in a highlighter blob (teal by default; teal, yellow, pink in turn where numbers line up) with a Permanent Marker numeral in `on-hl`. Small references to other steps use circles instead (teal-filled in step chips, ink-outlined in the roster). Never a bare digit or a square badge.

## Components

### Buttons
A marker-outlined sticker you press into the page.
- **Shape:** hand-cut corners (14px 18px 13px 17px / 17px 13px 18px 14px) with a 2.5px Marker Ink border drawn through the wobble filter.
- **Primary:** Highlighter Yellow with `on-hl` text in Patrick Hand SC 1.35rem, padding 0.78rem 1.35rem 0.72rem, a trailing "→" on the main action, and the Button shadow ("Start with step 0").
- **Secondary:** Card Stock with Marker Ink text, same shape and shadow ("Which path fits me?", "Print this checklist").
- **Hover / Focus:** lift and press (see Elevation). Focus everywhere is a 3px dashed Teal Fineliner outline with a 3px offset, following the component's corners.
- **Prev / next cards** share the language: Card Stock, 2px wobble border, `wobble` corners, Button shadow lifting to 6px 7px, titles in Patrick Hand SC 1.3rem over a Pencil Note label.

### Chips
- **Click-path keys:** each menu item is a crisp Inter 600 key (0.92rem) on Card Stock with a 2px ink border, 8px 11px 9px 12px corners and the Chip shadow; a key stays on one line unless it is wider than the screen, then it wraps. Keys are joined by hand-drawn arrows (Pencil Note, 2.2 stroke) and introduced by a handwritten label tilted −2° ("In GitHub", "In the Entra admin center", "In the Azure portal", "In your IDE"). The last key is the destination and takes its app's highlighter: yellow for GitHub, IDEs and Visual Studio, teal for Entra, pink for Azure. The group carries the full path once in its `aria-label`.
- **Role tags:** Patrick Hand SC 1.08rem stickers in the role's highlighter with `on-hl` text, a 1.5px ink border, `wobble-sm` corners and a small ink dot. The role leading a step is filled; helpers are dashed outlines whose dot carries the role color. Enterprise owner yellow, Entra admin teal, Azure owner pink, contact lilac, developers apricot, project lead pencil.
- **Role dots and lane marks:** route stops show 0.7rem role dots (dashed rings for helpers). In the swimlanes a "leads" mark is filled with the role color over a 2px 2px ink offset; a "helps" mark is a dashed outline over a 45° hatch of the role color.
- **Step chips:** "Needs" links as Cream Notebook pills with a 1.5px ink border, Patrick Hand SC 1.08rem, led by a 1.45rem teal circle numeral; hover fills Pressed Paper.
- **Path tags:** small lilac `wobble-sm` tags (Patrick Hand SC 0.95rem) that mark a checkpoint as Path A or Path B only.

### Cards / Containers
- **Recipe:** Card Stock on paper, a 2px Marker Ink border through the wobble filter, `wobble` corners, internal padding 1–1.4rem. Framed panels take the Panel shadow; cards that carry a meaning take a Meaning shadow.
- **Path cards:** two columns that stack below 44rem; 2.5px border; the path name in Permanent Marker 1.4rem on its path's swipe; a Patrick Hand SC 1.25rem "fits you if" line; Inter 0.97rem bullets; one primary button spans the row below.
- **Role roster:** a definition list in a Panel-shadowed frame; rows of role tag, description and 1.6rem ink-outlined step circles, split by 1.5px dashed `ink-4`, stacking below 40rem.
- **Tables and `<details>`:** 2px ink border, `sheet` corners, Card Stock. Table heads are Pressed Paper with Patrick Hand SC 1.1rem above a 2px ink rule; rows split on 1.5px dashed `ink-4`. Details summaries are Patrick Hand SC 1.2rem led by a yellow blob "+" that turns into "–" and tilts −8° when open (200ms).
- **Numbered steps (`<Steps>`):** 2.2rem blob bullets (Permanent Marker 1.05rem, 2px ink, Chip shadow) cycling teal, yellow, pink, joined by a 2px dashed `ink-4` connector.
- **Code frames (Expressive Code):** 2px ink border, `code-frame` corners, Card Stock code background, Pressed Paper tab bar with a pink active-tab indicator, Patrick Hand SC 1.05rem UI labels, 0.9rem code, Panel shadow; the `github-light` syntax theme; marked lines on a yellow band with a yellow edge. Long lines wrap (with their indent) instead of scrolling sideways.
- **Checklist steps:** printable cards ruled with teal lines every 2.05rem (30% teal), a 2.2rem teal blob numeral, a Permanent Marker 1.35rem title, short role tags, the hands-on time in Patrick Hand SC, and drawn checkboxes.

### Inputs / Fields
- **Style:** the only fields are Starlight's search trigger and the language select (there is no theme select): Card Stock, 2px ink border, `wobble-sm` corners, Marker Ink text; the search label is Patrick Hand SC 1.05rem.
- **Focus:** the global dashed Teal Fineliner outline. There are no custom form inputs; checkpoint boxes are drawings, not checkboxes.

### Navigation
- **Header:** the paper ground with the wavy ink rule as its bottom edge instead of a border; the site title in Permanent Marker 1.35rem beside the rocket logo (2.4rem tall, tilted −6°).
- **Sidebar:** group labels in Permanent Marker 1.05rem on the teal brush; links in Patrick Hand SC 1.15rem (Graphite, `wobble-sm` corners) that fill with Pressed Paper on hover (160ms). The current page sits on the pink swipe in `on-hl`. Setup steps carry 1.55rem teal blob numerals (Permanent Marker 0.8rem, 1.5px ink).
- **Table of contents:** heading in Patrick Hand SC 1.15rem; entries in Pencil Note; the current entry in Marker Ink on the Link Band.
- **Tabs:** Patrick Hand SC 1.12rem in Pencil Note over a 2px ink baseline; the selected tab is a yellow folder tab (2px ink border, `on-hl` text).
- **Footer:** a dashed 2px `ink-4` box with `wobble` corners and a pink asterisk doodle; the "not official documentation" disclaimer in Graphite and the "last verified" date in Pencil Note (0.9rem); links in Marker Ink underlined in teal.
- **Mobile:** Starlight's drawer; below 50rem the hero adds a handwritten "Read in English" / "Auf Deutsch lesen" link underlined in teal.

### Callouts and Rocket Moods
An aside the rocket is pointing at.
- Card Stock, 2px ink wobble border (2.5px for danger), `wobble` corners, padding 1rem 4.6rem 1.05rem 1.25rem so text clears the rocket, block margins 2rem above and 1.6rem below.
- A 3.6rem rocket doodle overhangs the top-right corner (top −1.6rem, right 0.6rem, tilted 6°). One rocket per callout.
- The title is Patrick Hand SC 1.25rem in `on-hl` on a swipe; the shadow is a 6px 6px Meaning offset. Types:
  - **note** ("Good to know"): teal swipe and shadow; the rocket beside a teal "i" disc.
  - **tip** ("Tip"): yellow; the rocket tilted 14° with a yellow sparkle and a pink asterisk.
  - **caution** ("Careful"): pink; a small-flame rocket tilted −12° beside a yellow warning triangle.
  - **danger** ("Stop and check"): pink swipe, ink shadow, 2.5px border; the warning triangle turns pink with a double mark.
  - **wait** ("Time to wait"): lilac swipe and shadow; the rocket parked on its pad without flame, "z z" above it.
- Starlight's built-in asides are restyled to match as a fallback, but content uses the Callout component.

### Rocket Doodle
The site's only mark: an original rocket on a launch pad, drawn once (120 × 120 viewBox) and rendered inline.
- Cream body and smoke (#fffdf6), teal window and fins, a yellow flame with a pink core, round-capped Marker Ink outlines (4.6 for pad and lines, 3.5 body, about 3 for details); the logo file (`src/assets/logo.svg`) uses #111111 strokes.
- Moods: **launch** (logo, favicon on a rounded Cream Notebook tile, the 11rem hero rocket tilted 4°), **wait** (route stops at 1.9rem, wait callouts), **note**, **tip**, **caution**, **danger**, and **done** (flying off at 45° on a dotted trail, the 4rem finish of the route).
- Decorative (`aria-hidden`) unless it is given a label.

### Step Intro Card
The fixed opening of every step page: the answers come before the instructions.
- Card Stock, 2px ink wobble border, `wobble` corners, padding 1.3rem 1.4rem 1.2rem, block margins 1.2rem and 2.4rem, and the Halftone shadow.
- Two columns (1.2fr / 1fr, stacked below 42rem). Left, a facts grid with Patrick Hand SC labels in Pencil Note: **Who** (role tags, the lead filled), **Hands-on** (Permanent Marker 1.45rem), **Then wait** (hourglass doodle and Patrick Hand SC 1.15rem), **Needs** (step chips, or "Nothing before this"); then an optional **Have ready** list below a 2px dashed `ink-4` rule, bulleted with teal marker arrows.
- Right, the mini system map with this step's focus, captioned in Patrick Hand SC ("The part of your setup this step touches").

### Route Board
The whole journey on one board, directly under the home hero.
- At 72rem and up: a 1200 × 480 board (fixed aspect ratio) with 11 stops on two rows of six columns. Row 1 runs left to right, a dashed rough.js trail (2.2 stroke) loops down the right edge, row 2 runs back right to left and ends at the "done" rocket bottom-left, labeled "Copilot in every IDE" in Pink Fineliner.
- Each stop: a 4rem blob numeral (Permanent Marker 1.75rem, 2.5px ink, Badge shadow) cycling teal, yellow, pink; a Patrick Hand SC 1.22rem title; role dots and the hands-on time (Inter 0.82rem); and, where a wait follows, a parked rocket with the wait in Patrick Hand SC 0.98rem. Hover lifts and tilts the numeral and underlines the title in teal (180ms).
- Margin notes in Pink Fineliner handwriting: "Start here" (tilted −5°) and the parallel-steps note with its curved arrow.
- Below 72rem: a vertical list along a 2.5px dashed `ink-4` spine, numerals in a 4rem left column, the parallel note inline.
- Legend: role dots with short names, "dashed = helps", and "Times are rough estimates" in Pink Fineliner.

### Journey Swimlanes
- A role-by-step table in a Card Stock frame (wobble border, `wobble` corners, Panel shadow) that scrolls sideways inside itself (min-width 56rem), the role column sticky behind a 2px ink rule; the page widens to 64rem.
- Column heads: 1.9rem teal blob numerals over Patrick Hand SC 1rem titles; steps that can run in parallel are tinted with 14% teal.
- Lanes split on 1.5px dashed `ink-4`; cells hold "leads" or "helps" lane marks; footer rows give hands-on and wait times in Patrick Hand SC 0.98rem.
- A legend explains the marks and the teal parallel swatch; below 72rem a scroll hint appears.

### Note-Paper Checkpoints
"Done when" is a sheet of note paper, not a bullet list.
- Card Stock with a pink margin line (60% pink, 1.7rem from the left edge), `wobble` corners, wobble border, padding 1rem 1.3rem 1.1rem 2.6rem.
- Each check (Inter 1.02rem, line-height 1.5) sits on a 1.5px teal ruled line (45% teal) beside a hand-drawn empty checkbox: a wobbly square with Card Stock fill and a 2.2 ink stroke. The boxes are drawings, never interactive.
- The sheet ends with "All checkpoints on one printable page →" (Patrick Hand SC 1.12rem, teal underline); lilac path tags mark checks that apply to one path.

### Sticky Notes
- Highlighter notes (yellow, pink, teal) with `on-hl` text, a curled bottom-right corner (2px 3px 22px 3px), padding 1.5rem 1.25rem 1.3rem, the Sticky shadow, and a strip of translucent paper tape (60% Card Stock, tilted −3°) on top.
- Rows auto-fit at a 12.5rem minimum with 2rem / 1.5rem gaps; notes tilt −1.6°, 1.2° (dropped 0.4rem) and −0.6° in turn.
- Titles in Permanent Marker 1.35rem; bodies in Inter 0.98rem; links are plain ink underlines and code sits on translucent paper, because no highlighter band goes on a highlighter.

### Doc-Link Stack
Every step hands off to the official docs.
- A vertical stack (0.6rem gap) of full-width link cards: Card Stock, 2px ink wobble border, 12px 16px 11px 15px corners, padding 0.65rem 0.95rem, Inter 550 in Marker Ink, a teal Permanent Marker "↗" at the end, the Badge shadow.
- Hover lifts 1px left and 2px up onto the Panel shadow (160ms).

### Video Card
A click-to-load facade: nothing loads from YouTube until the reader presses play.
- A 2.5px wobble border with 18px 14px 20px 16px corners and the Panel shadow; inside, Card Stock with a strip of pink diagonal stripes (−35°, 55% pink) behind the 6.6rem play column.
- The play disc is a yellow blob (2.6 ink stroke) with an `on-hl` triangle; the title is Permanent Marker 1.22rem; the length is Patrick Hand SC 1.05rem in Pencil Note.
- Hover scales the disc 1.08 and tilts it −4° (200ms) and underlines the title in pink. On play the frame becomes a 16:9 black `youtube-nocookie.com` embed and focus moves into it.
- The caption (Inter 0.95rem, Graphite) gives the summary and a 0.85rem privacy note with an "Open on YouTube ↗" link.

### Rough.js Diagrams
- Generated at build time with `createSketch(seed)` (`src/lib/rough.ts`); every diagram has a fixed seed, so each build emits identical SVG. Defaults: stroke 2, roughness 1.3, bowing 0.9, hachure fill at −41° with gap 6 (containers 9–12), fill weight 1.4, dashes 7 / 7; arrowheads 13px at ±0.48 rad with roughness 0.7.
- Color only through tones, emitted as classes: strokes `sk-s-ink`, `sk-s-soft`, `sk-s-muted`, `sk-s-paper`, `sk-s-yellow`, `sk-s-pink`, `sk-s-teal` (or `sk-s-none`); fills `sk-f-paper`, `sk-f-yellow`, `sk-f-pink`, `sk-f-teal`. Hachure strokes add `sk-hatch` (1.15px at 0.8 opacity).
- Conventions: containers take a 2.4 stroke and highlighter hachure; items inside them are solid Card Stock; flows are ink at 2.2–2.4; the flow that matters is pink at 2.6–2.8; numbered step badges are solid yellow ellipses with Permanent Marker numerals.
- Labels come from `label()` as `sk-text`: Patrick Hand SC in Marker Ink over a 5px Card Stock halo painted beneath the glyphs, so hachure never cuts letters. Variants: `sk-text--title` (Permanent Marker), `sk-text--soft` (Pencil Note), `sk-text--muted` (Faded Sketch), `sk-text--pink` (Pink Fineliner), `sk-text--num` and `sk-text--on-hl` (Highlighter Ink, no halo).
- **Focus staging:** the system map is the same sketch on every step. The overview fills Entra and the IDE teal, GHE.com yellow, Azure pink and Copilot with paper; on a step page the focused boxes switch to yellow hachure with a 2.4 ink stroke, the focused flows turn pink at 3.2 and draw themselves in, and everything else fades to thin `soft` or `muted` strokes and labels.
- **Draw-in:** flows flagged to draw animate their stroke over 1100ms on `--ease-out` once 30% of the diagram is visible, and arrowheads fade in after 800ms. Diagrams already on screen at load, and readers who prefer reduced motion, see them fully drawn.
- **Access:** every diagram SVG has `role="img"`, a `<title>` and a `<desc>`; wide ones scroll inside a focusable group (min-width 34rem) with a fade and a "← swipe →" hint below 36rem; the full system map swaps to the mini map below 44rem.

## Do's and Don'ts

### Do:
- **Do** build every new framed surface from the recipe: Card Stock, a 2px Marker Ink border, `wobble` corners, and its selector added to the `#sk-wobble` border list.
- **Do** take shadows from the vocabulary: 2px 3px chips, 3px 4px badges, 4px 5px buttons, 5px 6px framed panels, and 6px 6px in the callout's color for asides.
- **Do** give every clickable drawn object the lift-and-press pair: translate(−2px, −2px) onto a 2px larger shadow on hover, translate(3px, 4px) onto 1px 1px on press, 160ms on `--ease-out`.
- **Do** set text on any highlighter fill in `on-hl` (#111111).
- **Do** write UI menu paths as click-path keys in Inter and color only the destination key, by app: yellow GitHub, teal Entra, pink Azure.
- **Do** mark notes, tips, cautions, dangers and waits with the Callout component and its rocket mood.
- **Do** draw new diagrams with `createSketch` and a fixed seed, the seven tones, `label()` text, and a `<title>` plus `<desc>`.
- **Do** draw new icons as inline SVG doodles with round caps and joins in Marker Ink (stroke 1.8–3), `aria-hidden` and `focusable="false"`.
- **Do** keep reading text at 70ch and move answers into the step intro card, click paths and "done when" checkpoints rather than paragraphs.
- **Do** gate entrance motion behind `prefers-reduced-motion: no-preference` and use `--ease-out` (cubic-bezier(0.16, 1, 0.3, 1)).

### Don't:
- **Don't** let a page read like raw docs: walls of text and dense reference paragraphs are the confirmed failure mode ("too dense and text-heavy, like reading raw docs").
- **Don't** use blurred or soft shadows; every shadow is a solid, zero-blur offset falling down-right.
- **Don't** add screenshots. Visuals are rough.js diagrams and click-to-load video cards only.
- **Don't** use the GitHub logo as the site logo, favicon or a doodle, and never modify it; GitHub's brand rules forbid both. The mark is the original rocket.
- **Don't** add saved progress, interactive checkboxes or stored state to checkpoints or the checklist; they are static and printable.
- **Don't** add a dark theme, a theme switch or `prefers-color-scheme` styles. The site is light-only; Starlight's `ThemeProvider` and `ThemeSelect` are overridden to keep it that way.
- **Don't** set paragraphs or exact UI labels in Permanent Marker or Patrick Hand SC, and never bold the hand fonts.
- **Don't** introduce new accents, or use lilac, apricot or pencil outside their roles (and lilac's waiting state).
- **Don't** filter text, fills or whole components through `#sk-wobble`, and don't spend `::before` on a wobble-listed component; extra decoration goes on `::after`.
- **Don't** rotate framed panels, tables or code; tilt only small stuck-on objects, by a few degrees.
- **Don't** use `ink-4` for text, or put light text on a highlighter.
