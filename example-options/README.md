# Design options — identity platform rebrand

Six landing-page directions explored for repositioning this project as a
self-hostable identity and authorization platform: authorization that third
parties integrate against, AI analytics over the auth stream, and MCP support
that treats an AI agent as a principal in its own right rather than a shared
API key.

One of these is meant to be chosen and built. The rest are the argument for it.

> **Everything here is fictional.** The product names, the certifications, the
> throughput figures, the hashes, the customer references and the log lines are
> all invented for the exercise. None of it describes a real service, and none
> of the names has been checked for trademark conflicts. Do not lift any of the
> claims into real marketing copy.

## The directions

| | Name | Concept | Ground | Leads with |
|---|---|---|---|---|
| A | Signet | A seal proves who authorized a thing | Warm near-black | Trust |
| B | Portcullis | The room where you watch every identity | Cool slate | AI analytics |
| C | Trellis | Authorization *is* a graph | Light | MCP + integration |
| D | Attest | Identity is a record | Off-white | The audit chain |
| E | Bastion | The terminal *is* the product | Charcoal | Self-hosting |
| F | Marque | Delegated authority, on the record | Oxblood | Agent delegation |

A–C are the first round and share a restrained "panels and hairlines" idiom.
D–F are the second round and each take a position: D is severe Swiss
typography, E is a terminal UI, F is a colour-field poster.

## Viewing them

Open any file directly in a browser. They were authored as page *content* —
no `<!doctype>`, `<html>`, `<head>` or `<body>` wrapper — because they were
built to be injected into a host page, but every browser synthesises those,
so they render standalone without modification.

Each page carries two review aids that are **not** part of the design:

- a fixed light/dark switch, bottom right
- a palette appendix at the foot of the page

The palette reads its hex values back out of the live stylesheet with
`getComputedStyle` rather than hardcoding them, so a swatch can never drift
from the token it documents. Flip the switch and the whole table re-resolves —
which is the quickest way to see which colours are genuinely redesigned for
the second theme and which are merely inverted.

Strip both before anything ships.

## Constraints every file respects

- **Self-contained.** No network requests of any kind: no font CDNs, no
  external stylesheets or scripts, no remote images. System font stacks only;
  all artwork is inline SVG or CSS.
- **Both themes.** Palette declared as custom properties, restated in full
  under `prefers-color-scheme` and under `[data-theme]` so an explicit choice
  wins over the OS preference in both directions.
- **Reduced motion honoured**, including zeroing delays — not only durations.
  An entrance whose resting state is `opacity: 0` stays invisible for the whole
  delay otherwise.
- **Content never depends on JavaScript succeeding.** Reveal animations are
  gated behind a scripting flag, so a failure leaves the page readable rather
  than blank.
- Responsive, keyboard-focusable, and no horizontal scrolling on the body.
