# Release readiness

The repository now contains the source, icon, runtime, security, test, CI, and release scaffolding for the Windows Electron and macOS Tauri wrappers. Signing and publishing remain intentionally disabled until the project owner supplies credentials.

## Windows

Provide `CSC_LINK`, `CSC_KEY_PASSWORD`, and optionally `GH_TOKEN` through protected GitHub Actions Secrets. Build with `desktop/electron/npm run dist`, verify the Authenticode signature with `desktop/electron/scripts/verify-signature.ps1`, generate `SBOM.json`, and publish the installer together with `latest.yml` and any `.blockmap` files.

The checked-in `resources/latest.yml.example` documents the updater shape, while `scripts/create-release-manifest.mjs` creates SHA-256 and size records for a release-artifact directory. Neither publishes or trusts placeholder values.

## macOS

Provide Apple Developer ID certificate, password, signing identity, Apple ID, app-specific password, and team ID through protected secrets. Build arm64 and x86_64 artifacts on macOS, sign the `.app` and optional DMG, submit with `notarytool`, staple the ticket, verify with `codesign` and `spctl`, and publish a checksum/SBOM manifest. The included entitlement and privacy-manifest files are templates and must be reviewed against the actual product capabilities.

The checked-in `desktop/tauri/latest.json.example` documents the signed updater manifest shape. Localhost OAuth primitives are available under the Electron and Tauri source trees for a future authenticated product, but are not connected to this no-account app.

## Not enabled by default

The current app has no OAuth, remote URL, updater, crash reporter, keychain storage, notifications, deep-link scheme, or account backend. Do not enable those features by copying a generic template: add the minimum plugin/capability permissions, threat-model the data flow, write tests, and update the privacy/security documentation first.
