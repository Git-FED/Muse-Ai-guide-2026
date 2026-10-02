# Security, privacy, and build provenance

## What the app does

FedPromptly Muse Audit is a static, offline-first guide and device-local ledger. The ledger stores entries in browser/WebView `localStorage` and supports CSV/JSON export. It does not require an account, backend, API key, telemetry service, or private Muse integration.

The same web source under `site/` powers the browser/PWA, Android WebView, Electron Windows, and Tauri macOS variants. The desktop shells do not provide web content with Node, shell, filesystem, or native API access.

## Network and navigation boundary

The project contains explicit external URLs for community, contact, and donation/payment providers. No payment page, account page, provider dashboard, or third-party resource is automatically embedded or submitted.

| Target | Internal content | External behavior |
|---|---|---|
| Browser/PWA | Static site | Normal browser behavior after a user follows a link |
| Android | `file:///android_asset/site/` | Explicit `http:`, `https:`, and `mailto:` links use Android's registered handler |
| Electron Windows | Packaged `site/` directory | Explicit `http:`, `https:`, and `mailto:` links use the Windows default handler; all other navigation is blocked |
| Tauri macOS | Packaged Tauri local origin | Explicit `http:`, `https:`, and `mailto:` links use the macOS default handler; all other navigation is blocked |

Android declares `INTERNET` because the site contains explicit external links and uses `usesCleartextTraffic="false"`. Electron keeps Node integration disabled, enables context isolation/sandboxing/web security, blocks permission requests, and disables `<webview>` attachment. Tauri applies a local-only CSP and opens allowed external links from the Rust shell rather than allowing the web content to browse away from the app.

## What the source audit found

- No analytics SDK, Firebase SDK, tracking pixel, credential collection, or custom data-upload endpoint was found in the supplied source.
- The site includes explicit external URLs for community, contact, and donation/payment providers. Those providers have their own privacy policies and are outside this project’s control.
- The original prebuilt APK artifacts supplied with the project should be treated as untrusted release artifacts until rebuilt and independently verified. A source archive and a binary are not proof that the binary came from that source.

## Reproduce and verify

1. Clone or extract the source archive.
2. Inspect `site/`, the native shell configuration, and the GitHub workflow.
3. Run the structural check from the repository root:

   ```bash
   node scripts/verify-desktop.mjs
   ```

4. Build the target locally using its documented commands:

   ```bash
   # Electron Windows
   cd desktop/electron && npm ci && npm run dist

   # Tauri macOS (on macOS)
   cd desktop/tauri && npm ci && npm run build:macos

   # Android (in an Android/Java 17 environment)
   cd android && ./gradlew --no-daemon assembleDebug
   ```

5. Hash the resulting artifact and compare it only to a build from the same commit, toolchain, configuration, and inputs.
6. Install only a build you produced or one with a signing identity and provenance you trust.

GitHub Actions produces build artifacts for review and testing. They are not release-signing, Apple notarization, Windows code-signing, or independent supply-chain attestations.

## Distribution guidance

- **Windows:** code-sign an installer with a certificate owned by the project maintainer before broad distribution. Unsigned installers can show reputation or SmartScreen warnings.
- **macOS:** sign the `.app` with a project-controlled Developer ID certificate and notarize it before distribution outside a controlled environment. Gatekeeper warnings are expected otherwise.
- **Android:** debug APKs are not Play Store production releases and should be treated as sideloading builds.

## Reporting

Do not submit private account exports, credentials, or access tokens in issues. Report suspected security problems with a minimal reproduction and no sensitive data.
