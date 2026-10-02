# Draft public response

Thanks for the careful read. The fair version of the critique is:

- **Safe to inspect:** the supplied source is a small static site plus an Android WebView. I found no analytics SDK, Firebase, credential collector, custom telemetry endpoint, or data-harvesting routine in the source. The runtime now uses a strict local-only Content Security Policy and does not inject payment or analytics SDKs.
- **Do not blindly install:** you are right that a prebuilt APK deserves separate scrutiny. Public source does not prove that a binary was built from that source. The project now documents this explicitly and recommends building the Android app yourself or using the web/PWA version.
- **Android-only was an outdated criticism:** the Android wrapper is optional. The core site now works as a responsive desktop/mobile web app and can be installed as a PWA on iOS Safari and desktop browsers. Android bundles the same web assets.
- **The idea is deliberately modest:** the value is not a magical usage meter. It is a bookkeeping pattern: one action at a time, network bytes separate from model tokens, and measured/reported/estimated/unavailable values kept distinct. If an agent or provider cannot expose a value, the correct answer remains “unavailable.” The documentation now also states that the prompt itself has overhead and is not worth using for trivial jobs.
- **Donations are optional and external:** any donation or payment link goes to a third-party provider. The project does not store card details or require payment to use the audit guide or local ledger.

So the practical recommendation is the same: inspect the source, do not install an unverified APK, and use the lightweight ledger only when it helps with a genuinely data-heavy workflow. The project is a small open-source utility, not a claim of proprietary telemetry or a replacement for platform-level usage reporting.
