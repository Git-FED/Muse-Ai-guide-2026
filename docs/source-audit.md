# Static source and APK audit summary

Date: 2026-10-02

## Scope

Reviewed the supplied `FedPromptlyMuseAudit-Android.zip` source archive and the two prebuilt APKs contained in the earlier project archive:

- `FedPromptlyMuseAudit-debug.apk` — SHA-256 `51c7a7c4ba069320211e06f5a09d7ab14fad3f539103abed7a4803db52f1978a`
- `app-debug.apk` — SHA-256 `b79ebf99bcb380a598de325417b7db3956459b1402885df9d01b7220b198eade`

The newer Android source archive contains source and CI workflows but no APK.

## Findings

| Area | Result | Notes |
|---|---|---|
| Data collection code | No suspicious collector found | No analytics SDK, Firebase, custom upload endpoint, credential form, or tracking routine found in reviewed source. |
| Local storage | Present | Used for reading mode, age gate, and the new local ledger; this is device-local browser/WebView storage. |
| Android permissions | `INTERNET` only in the source manifest | Needed for external links and optional provider/payment resources. No contacts, location, camera, microphone, SMS, phone, or storage permissions. |
| Cleartext traffic | Disabled | Manifest sets `android:usesCleartextTraffic="false"`. |
| External services | Present | Donation/payment/community/contact links and optional PayPal/Stripe loader exist in the site source. These providers must be reviewed independently. |
| APK provenance | Not established | A public source archive alone cannot prove binary/source correspondence. The supplied APKs had no conventional v1 certificate entry visible in their ZIP listings; signing/build identity still requires Android signing-tool verification. |
| Build reproducibility | Improved | The newer source archive includes Gradle wrapper and GitHub Actions build workflow. The workflow builds a debug APK; it is not a release-signing attestation. |

## Conclusion

The source review supports “safe to inspect, do not blindly install an unverified APK.” It does not support a claim that the binaries are malicious, nor does it prove they are reproducibly built from the reviewed source. The recommended path is source review plus a local or independently verified rebuild.
