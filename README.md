# FedPromptly Muse Audit

FedPromptly Muse Audit is an offline-first usage-audit companion for Muse-by-Meta workflows. It provides a responsive static guide plus a device-local ledger for recording evidence, sent/received bytes, value status, and outcomes. It does **not** claim private Muse telemetry or provide a Meta account integration.

## What is included

| Surface | Location | Behavior |
|---|---|---|
| Web/PWA | `site/` | Self-contained HTML pages and a local `localStorage` ledger |
| Android | `android/` | Local Android WebView shell around the same site |
| Windows | `desktop/electron/` | Electron URL-to-app shell with an NSIS installer target |
| macOS | `desktop/tauri/` | Tauri URL-to-web-app shell with a `.app` bundle target |

The static pages work with `file://` as well as a local web server. Ledger records stay in the browser or WebView's `localStorage` unless a user explicitly exports CSV or JSON.

## Run the web version

```bash
cd site
python3 -m http.server 8080
```

Open `http://localhost:8080/usage-audit.html`.

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

For the exhaustive checked-in structure, see [COMPLETE-DESKTOP-TREE.md](COMPLETE-DESKTOP-TREE.md). Release signing, notarization, updater feeds, and publishing are documented in [RELEASE-READINESS.md](RELEASE-READINESS.md) but are not enabled without project-owned credentials.

## Android build

Open `android/` in Android Studio or run the following in a Java 17 / Android SDK environment:

```bash
cd android
./gradlew assembleDebug
bash ./scripts/capture-apk-provenance.sh \
  app/build/outputs/apk/debug/app-debug.apk \
  app/build/outputs/apk/debug/apk-provenance.json
```

## GitHub Actions

The unified workflow in [`.github/workflows/build-all.yml`](.github/workflows/build-all.yml) validates the web and desktop structure, builds the Android debug APK, produces an Electron Windows NSIS installer, and produces a Tauri macOS `.app` bundle. CI artifacts are build outputs, not signed or notarized release binaries.

## Trust and security

Read [SECURITY.md](SECURITY.md) before installing an APK or desktop binary. The application is designed to remain local-first: no account, backend, API key, analytics SDK, or automatic third-party loader is required. Explicit external links open only after user activation in the default system handler.

## License

This project is available under the [MIT License](LICENSE).
