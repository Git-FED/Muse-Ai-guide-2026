# FedPromptly × Muse by Meta

<img width="1312" height="711" alt="Screenshot 2026-10-01 164727" src="https://github.com/user-attachments/assets/bc683765-5a19-4fe9-9942-d37f41eef586" />

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

<img width="1308" height="715" alt="Screenshot 2026-10-01 164820" src="https://github.com/user-attachments/assets/d635e2d1-def2-4230-b6d7-2f24ba18a0c7" />

## Open locally

Double-click `index.html`, or serve the folder for local navigation testing:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

<img width="1306" height="713" alt="Screenshot 2026-10-01 164901" src="https://github.com/user-attachments/assets/58a3e3e1-bc73-40d2-a60e-ad3e2f539825" />

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
<img width="1299" height="719" alt="Screenshot 2026-10-01 165124" src="https://github.com/user-attachments/assets/896a4ae9-d76d-4702-90d2-43ba54197dab" />

## Scope and attribution

FedPromptly is an independent project themed for Muse by Meta. “Muse by Meta” and related marks belong to their respective owners. Confirm current Muse capabilities, Meta terms, privacy requirements, and regional rules before deploying an audit workflow.

## Contact

- careers@fedpromptly.com
- support@fedpromptly.com
- contact@fedpromptly.com
- business@fedpromptly.com

<img width="1304" height="711" alt="Screenshot 2026-10-01 164953" src="https://github.com/user-attachments/assets/2b05b647-c7ce-46b8-80af-d3cad90824e7" />
