# Optional desktop features

The core product is complete as a local-first static app. The following files now provide implementation and release templates for features that were intentionally not enabled by default.

| Feature | Electron | Tauri | Default state |
|---|---|---|---|
| Auto-update | `resources/latest.yml.example`, `dev-app-update.yml` | `latest.json.example` | Disabled until signed artifacts and a hosted feed exist |
| Release checksums | `scripts/generate-sbom.cjs` | `scripts/create-release-manifest.mjs` | Generator available; no release is published |
| OAuth loopback | `src/auth/loopback-server.cjs` and tests | Add a Rust loopback listener only after selecting an OAuth provider | Disabled; current app has no accounts |
| Deep links | Add a registered protocol only after defining the scheme and payload | Add Tauri deep-link plugin and capability only after defining the scheme | Disabled |
| Notifications | Electron main-process API can be added behind an explicit permission decision | Add notification plugin and capability | Disabled |
| Crash reporting | Add `crashReporter` only with documented retention/consent | Add a reviewed Sentry/Rust integration | Disabled |
| Keychain/token storage | Add OS credential storage only for an authenticated product | Add keyring/keychain plugin and least-privilege capability | Disabled |

Do not publish the example manifests. Replace placeholders with real signed hashes, URLs, signatures, and release metadata only in a protected release job.
