# Cross-platform validation

The core product is the responsive web/PWA site. There is no native iOS or macOS binary in this project.

## Desktop

Serve `site/` over HTTP or HTTPS and open `usage-audit.html` in a current Chromium, Firefox, or Safari browser. Add an entry, reload, export JSON, and confirm the entry remains local to that browser profile. Verify that the page still works with network access disabled after the initial page load.

## iOS Safari/PWA

Open the HTTPS site in Safari on iOS, use Share → Add to Home Screen, launch the installed web app, and repeat the add/reload/export test. Confirm that the ledger remains on-device and that external provider links open only after an explicit tap. iOS Home Screen storage behavior can vary after deleting the web app or clearing Safari data; export first.

## Android

Build the Android project from source or use a separately verified CI artifact. Install on an emulator/device, launch the bundled `index.html`, open `usage-audit.html`, add an entry, force-close/reopen, and verify local persistence. Test airplane mode after the first launch. Confirm that unsupported URL schemes are blocked and HTTPS/mail links open externally.

These are acceptance procedures, not claims that a device test was performed in the sandbox.
