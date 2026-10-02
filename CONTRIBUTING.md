# Contributing

Keep `site/` as the canonical frontend source. Do not commit staged Electron site files, `node_modules`, Rust `target`, signing certificates, credentials, cookies, or build artifacts.

Before opening a change, run:

```bash
node scripts/verify-desktop.mjs
cd desktop/electron && npm ci && npm run verify
cd ../tauri && npm ci && npm run verify
cd src-tauri && cargo fmt --all -- --check && cargo test --locked
```

Changes that add network access, account handling, native permissions, updater behavior, crash reporting, or external URL hosts must include updated security/privacy documentation and a focused test. Unsigned CI artifacts are for testing only.
