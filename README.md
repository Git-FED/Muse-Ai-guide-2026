# FedPromptly × Muse by Meta

<img width="1312" height="711" alt="Screenshot 2026-10-01 164727" src="https://github.com/user-attachments/assets/bb3d9546-ba67-4477-af2c-5094fe48bdcf" />

A standalone, Muse-by-Meta-themed usage-audit companion for people who want to understand what Muse did during a multi-step task without pretending to have telemetry they cannot actually see.

## What this project is

FedPromptly provides a visual field guide, copy-ready prompts, and reporting patterns for auditing **Muse by Meta workflows**. It is not a Meta product, does not claim private access to Meta telemetry, and does not replace Muse or Meta’s own product documentation.

The central rule is simple: record each Muse action, preserve the evidence, and keep **measured**, **reported**, **estimated**, and **unavailable** values separate.

## Standalone HTML pages

The complete information layer is available through self-contained HTML files:

- `index.html` — Muse by Meta control room and project overview
- `usage-audit.html` — full Muse Data Usage Audit Mode guide
- `docs.html` — HTML project manual, local opening, deployment, and guardrails
- `support.html` — grouped FedPromptly support and ecosystem page
- `privacy.html` — data-minimization guidance for Muse workflow audits
- `terms.html` — project, provider, and telemetry boundaries
- `accessibility.html` — keyboard, motion, contrast, and print notes
- `404.html` — animated Muse signal-lost state

Every HTML page embeds its own CSS and JavaScript, works with `file://`, includes responsive layout, animated reveal behavior, reduced-motion support, and the shared Muse-by-Meta visual system.

## Open locally

Double-click `index.html`, or serve the folder for local navigation testing:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Muse audit principles

1. Define one discrete Muse action at a time.
2. Record task ID, action ID, target, timing, outgoing data, incoming data, total, evidence, outcome, retries, and privacy level.
3. Keep Muse model-token usage separate from network-byte usage.
4. Label every value as measured, reported, estimated, or unavailable.
5. Ask before sign-in, account connection, uploads, large downloads, form submissions, purchases, settings changes, or sensitive disclosures.
6. Do not retain private content when category, size, and evidence are enough.

## Deployment

This is a plain static HTML repository. For a root-level Cloudflare Workers static-asset deployment:

```text
Build command: [blank]
Deploy command: npx wrangler deploy --assets=.
Root directory: /
Production branch: main
```

## Scope and attribution

FedPromptly is an independent project themed for Muse by Meta. “Muse by Meta” and related marks belong to their respective owners. Confirm current Muse capabilities, Meta terms, privacy requirements, and regional rules before deploying an audit workflow.

## Contact

- careers@fedpromptly.com
- support@fedpromptly.com
- contact@fedpromptly.com
- business@fedpromptly.com
