# Desktop targets

FedPromptly Muse Audit uses one local-first web codebase in `site/` and two thin desktop wrappers. The wrappers do not embed credentials, API keys, analytics, private Muse telemetry, or an account connection.

## Repository structure

```text
site/                           # Canonical static web/PWA source
desktop/icons/                  # Canonical PNG, ICO, and SVG source icons
desktop/electron/               # Windows Electron URL-to-app wrapper
desktop/tauri/                  # macOS Tauri URL-to-web-app wrapper
desktop/scripts/sync-site.mjs   # Electron-only staging helper
scripts/verify-desktop.mjs      # Structural validation used locally and in CI
.github/workflows/build-all.yml # Unified GitHub Actions workflow
```

## Windows — Electron

The Electron shell opens `https://muse.ai/` and produces a 64-bit NSIS installer. The staged `site/index.html` remains a packaged fallback.

```bash
cd desktop/electron
npm ci
npm run verify
npm run dist
```

The site is copied into `desktop/electron/site/` only as a build input and is ignored by Git. Electron has Node integration disabled, context isolation and sandboxing enabled, webview attachment disabled, and a deny-by-default permission policy. Navigation stays inside `muse.ai`/`www.muse.ai`; other `http:`, `https:`, and `mailto:` destinations are delegated to the system handler.

The full Electron scaffold includes `resources/app.config.json` as an editable `extraResources` runtime file, app/installer/uninstaller/tray assets under `build/`, a single-instance lock, optional close-to-tray behavior, a URL security test, SBOM helper, signature verification template, `.env.example`, and `electron-builder.yml`. The default runtime URL is `https://muse.ai/`, protected by an explicit host allowlist.

## macOS — Tauri

The Tauri app uses `site/` directly as the frontend distribution fallback, opens `https://muse.ai/` at runtime, and produces a `.app` bundle.

```bash
cd desktop/tauri
npm ci
npm run verify
npm run build:macos
```

`npm run build:macos` generates platform icon resources from `desktop/icons/fedpromptly-icon.png` before packaging. Tauri's CSP limits resource loading to the packaged local origin, and the Rust shell allows only internal app URLs or explicit `http:`, `https:`, and `mailto:` links opened by the macOS default handler.

The full Tauri scaffold includes `src-tauri/capabilities/default.json`, `.taurignore`, `rust-toolchain.toml`, generated app icons plus separate tray icons, macOS entitlement/privacy-manifest templates, and a Rust security test. Updater, OAuth, deep-link, notification, keychain, crash-reporting, and signing hooks remain disabled until service credentials and a reviewed threat model exist.

## GitHub Actions outputs

`.github/workflows/build-all.yml` validates the web/PWA bundle and desktop layout, then uploads separate artifacts for:

| Artifact | Runner | Output |
|---|---|---|
| Web/PWA package | Ubuntu | `fedpromptly-web-pwa-<sha>.tar.gz` |
| Android debug package and provenance | Ubuntu | `fedpromptly-muse-audit.apk`, checksum, provenance JSON |
| Electron Windows installer | Windows | NSIS `.exe` plus builder metadata |
| Tauri macOS app | macOS | `FedPromptly Muse Audit.app` |

These CI artifacts are test/build outputs. They are not automatically code-signed, notarized, published as GitHub Releases, or independently attested release binaries.
