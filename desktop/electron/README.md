# Electron Windows shell

This package turns `https://muse.ai/` into a Windows desktop app. The local `site/` bundle remains a build-time fallback; the wrapper does not require an account or add a telemetry service.

## Local development

Run from this directory:

```bash
npm ci
npm run verify
npm start
```

`npm start` stages the shared `../../site` files under the ignored `site/` directory, then starts Electron.

## Windows installer

```bash
npm ci
npm run dist
```

The x64 NSIS installer is written to `dist/` with a name similar to:

```text
FedPromptly Muse Audit-Setup-1.0.0-x64.exe
```

`electron-builder.yml` is the canonical build file. It includes the app icon, installer/uninstaller icons, tray icon, and `resources/app.config.json` as an editable `extraResources` file outside `app.asar`. The packaged runtime opens `https://muse.ai/`; only `muse.ai` and `www.muse.ai` remain inside the app window. Other external links open in the system browser.

Run `npm test` through the verification script to exercise the URL protocol guard. `npm run sbom` creates a local CycloneDX-style `SBOM.json` from the lockfile. Signing helpers are templates only: provide real Authenticode credentials through a protected CI secret before distribution.

## Navigation and permissions

- `contextIsolation`, Chromium sandboxing, and web security are enabled.
- Node integration is disabled.
- Navigation may remain within the staged site bundle or the approved `muse.ai` hosts.
- `http:`, `https:`, and `mailto:` links are handed to the system default browser or mail client.
- Permission requests and embedded `<webview>` attachment are denied.

The package is unsigned by default. Build and code-sign a release with an identity controlled by the project owner before broad distribution; an unsigned installer may trigger Windows reputation warnings.
