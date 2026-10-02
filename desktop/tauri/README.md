# Tauri macOS shell

This package turns the local `site/` bundle into a compact macOS application. It packages the shared static site directly from `../../../site`; no duplicate web build directory is committed.

## Prerequisites

Build on macOS with:

- Xcode Command Line Tools
- Rust stable (`rustup`)
- Node.js 22 or newer

## Build

Run from this directory:

```bash
npm ci
npm run verify
npm run build:macos
```

The build first generates Tauri's macOS `.icns` and required PNG icon sizes from `../icons/fedpromptly-icon.png`. The app bundle is written to:

```text
src-tauri/target/release/bundle/macos/FedPromptly Muse Audit.app
```

The repository also includes the Tauri v2 `capabilities/default.json` permission boundary, `.taurignore` watch exclusions, a pinned `rust-toolchain.toml`, separate tray icon assets, macOS entitlement/privacy-manifest templates, and `src-tauri/tests/security_test.rs`. These are conservative scaffolding; no updater, deep-link, notification, keychain, or OAuth plugin is enabled by default.

## Behavior and boundaries

- The static site is served from Tauri's packaged local origin.
- The Content Security Policy only permits bundled content and inline scripts/styles already present in the static pages.
- Internal navigation remains inside Tauri's local origin.
- Explicit `http:`, `https:`, and `mailto:` links open in the default system handler; other schemes are blocked.

The bundle is unsigned and not notarized by default. Before external distribution, sign it with a project-controlled Apple Developer certificate and complete notarization; Gatekeeper warnings are expected for an unsigned build. The `desktop/tauri/.env.example` file documents the CI variables without containing secrets.
