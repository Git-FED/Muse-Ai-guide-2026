# Electron production scaffold

The minimal runtime is intentionally local-first. The surrounding files provide the production extension points requested by the desktop checklist without silently enabling risky services:

- `resources/app.config.json` is copied with `extraResources`, so an installed app can read a real runtime configuration outside `app.asar`.
- `build/` contains the Windows app, installer, uninstaller, and tray icon assets.
- `electron-builder.yml` is the canonical packaging configuration.
- `test/security.test.cjs` validates the external protocol policy.
- `scripts/verify-signature.ps1` and `scripts/generate-sbom.cjs` are release helpers.
- `.env.example` documents signing/publishing variables; real secrets belong in a secret manager or GitHub Actions Secrets.

OAuth, auto-update, crash reporting, and deep-link handlers are intentionally not enabled because this app has no account or backend. Add them only with a provider-specific threat model and tests; do not turn on a generic remote URL without updating the exact-origin and allowed-host policy.
