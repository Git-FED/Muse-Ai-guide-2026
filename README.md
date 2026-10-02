# FedPromptly × Muse by Meta

FedPromptly Muse Audit is an offline-first usage-audit companion for Muse-by-Meta workflows. It provides a responsive static guide plus a device-local ledger for recording evidence, sent/received bytes, value status, and outcomes. It does **not** claim private Muse telemetry or provide a Meta account integration.

<img width="641" height="347" alt="Screenshot 2026-10-01 171957" src="https://github.com/user-attachments/assets/426b7398-ff30-4371-bef4-6fcb529f5e0b" />

## What is included

| Surface | Location | Behavior |
|---|---|---|
| Web/PWA | `site/` | Self-contained HTML pages and a local `localStorage` ledger |
| Android | `android/` | Local Android WebView shell around the same site |
| Windows | `desktop/electron/` | Electron URL-to-app shell with an NSIS installer target |
| macOS | `desktop/tauri/` | Tauri URL-to-web-app shell with a `.app` bundle target |
FedPromptly Muse Audit is an offline-first usage-audit companion for Muse-by-Meta workflows. It provides a responsive static guide plus a device-local ledger for recording evidence, sent/received bytes, value status, and outcomes. It does **not** claim private Muse telemetry or provide a Meta account integration.

The static pages work with `file://` as well as a local web server. Ledger records stay in the browser or WebView's `localStorage` unless a user explicitly exports CSV or JSON.

<img width="651" height="279" alt="Screenshot 2026-10-01 172012" src="https://github.com/user-attachments/assets/fbda619c-7253-4b05-8ffc-eaab5cc901e2" />

## Run the web version
## What is included

```bash
cd site
python3 -m http.server 8080
```
| Surface | Location | Behavior |
@@ -22,6 +27,8 @@ python3 -m http.server 8080

Open `http://localhost:8080/usage-audit.html`.

<img width="2560" height="1440" alt="22-muse-is-here" src="https://github.com/user-attachments/assets/7e79eb0a-16b1-45d6-95b1-09d7e1b15bf8" />

## Desktop builds

The desktop wrappers share the canonical site under `site/`; they do not create a second maintained frontend.

```bash
# Windows Electron / NSIS installer
cd desktop/electron
npm ci
npm run verify
npm run dist

# macOS Tauri / .app bundle (run on macOS)
cd desktop/tauri
npm ci
npm run verify
npm run build:macos
```

See [DESKTOP-TARGETS.md](DESKTOP-TARGETS.md), [desktop/README.md](desktop/README.md), and the target-specific READMEs for the precise output paths and security boundaries.
@@ -44,6 +51,8 @@ See [DESKTOP-TARGETS.md](DESKTOP-TARGETS.md), [desktop/README.md](desktop/README

For the exhaustive checked-in structure, see [COMPLETE-DESKTOP-TREE.md](COMPLETE-DESKTOP-TREE.md). Release signing, notarization, updater feeds, and publishing are documented in [RELEASE-READINESS.md](RELEASE-READINESS.md) but are not enabled without project-owned credentials.

<img width="2560" height="1440" alt="27-stories-in-motion" src="https://github.com/user-attachments/assets/4cdffd80-ff5d-405f-848b-f7f762e4d019" />

## Android build

Open `android/` in Android Studio or run the following in a Java 17 / Android SDK environment:

```bash
cd android
./gradlew assembleDebug
bash ./scripts/capture-apk-provenance.sh \
  app/build/outputs/apk/debug/app-debug.apk \
@@ -56,14 +65,92 @@ bash ./scripts/capture-apk-provenance.sh \
  app/build/outputs/apk/debug/apk-provenance.json
```

<img width="2560" height="1440" alt="04-social-graph" src="https://github.com/user-attachments/assets/fa4b2b3c-9e4c-45b5-ac6f-9b405997367a" />

## GitHub Actions

The unified workflow in [`.github/workflows/build-all.yml`](.github/workflows/build-all.yml) validates the web and desktop structure, builds the Android debug APK, produces an Electron Windows NSIS installer, and produces a Tauri macOS `.app` bundle. CI artifacts are build outputs, not signed or notarized release binaries.

<img width="2560" height="1440" alt="19-your-new-social" src="https://github.com/user-attachments/assets/bfe49f9f-72fb-4bbd-9d33-8b71fdd71156" />

## Trust and security

Read [SECURITY.md](SECURITY.md) before installing an APK or desktop binary. The application is designed to remain local-first: no account, backend, API key, analytics SDK, or automatic third-party loader is required. Explicit external links open only after user activation in the default system handler.

<img width="2560" height="1440" alt="24-the-feed-is-alive" src="https://github.com/user-attachments/assets/87e51bd4-016c-4316-9f0d-91fce81d2897" />

## License

This project is available under the [MIT License](LICENSE).

<img width="2560" height="1440" alt="25-like-comment-share" src="https://github.com/user-attachments/assets/f5000e02-fb09-48fa-abc0-644373e64f17" />

# FedPromptly × Muse by Meta

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
<img width="2560" height="1440" alt="23-built-for-the-feed" src="https://github.com/user-attachments/assets/6d6ce4e1-210a-4076-9f49-5df8655321e6" />

## Scope and attribution

FedPromptly is an independent project themed for Muse by Meta. “Muse by Meta” and related marks belong to their respective owners. Confirm current Muse capabilities, Meta terms, privacy requirements, and regional rules before deploying an audit workflow.

## Contact

- careers@fedpromptly.com
- support@fedpromptly.com
- contact@fedpromptly.com
- business@fedpromptly.com

<img width="2560" height="1440" alt="03-iterate-prompt" src="https://github.com/user-attachments/assets/e8025a2b-664f-404a-9221-6f001b79eb0f" />
