# FedPromptly Muse Audit Android App

This project wraps the supplied dependency-free FedPromptly/Muse by Meta static site in a native Android WebView shell.

## Behavior

- The full site is bundled under `app/src/main/assets/site` and opens offline.
- Internal page links stay inside the app.
- External HTTPS, `mailto:`, and community/payment links open in the device's browser or registered handler.
- The bundled payment scripts remain part of the original site and require internet access if those sections are used.
- The app is intentionally not branded as an official Meta product.

## Build

```bash
./gradlew assembleDebug
```

The debug APK is written to `app/build/outputs/apk/debug/app-debug.apk`.

## Install on a connected Android device

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

The project is plain local Android development and does not use Manus-managed services.

## Included Android resources

The project includes density-specific legacy launcher PNGs, Android 8+ adaptive and round launcher icons, a vector foreground, app strings, colors, light/dark themes, ProGuard configuration, and standard unit/instrumented-test source-set folders. See `ICONS.md` for the inventory.
