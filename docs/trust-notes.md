# FedPromptly Muse Audit: trust notes

## Short version

Read the source before installing anything. The project is an offline-first static site with an optional Android WebView shell. The current web experience works on desktop, iOS Safari/PWA, and Android; Android is not the only supported form anymore. The web runtime is local-only by default: no automatic payment, analytics, font, or upload script is loaded.

## What is worth learning

The useful idea is intentionally small: keep a per-action ledger, separate network bytes from model tokens, and label values as **Measured**, **Reported**, **Estimated**, or **Unavailable**. The project now includes a real local ledger so this is not only a copy-and-paste prompt.

## What is not claimed

- It is not a Meta product and does not claim access to private Muse telemetry.
- It cannot measure data that the host, browser, connector, or provider does not expose.
- An estimate is not a measurement.
- A prebuilt APK is not automatically trusted merely because its source is public.

## Safer use

Prefer the web/PWA version or build the Android project yourself. Review the manifest, source, external provider links, and generated APK before installation. CI now emits the APK checksum and source commit as provenance metadata, but this is not a release-signing attestation. Do not enter credentials or payment details into the project; provider actions should occur on the provider’s own site.
