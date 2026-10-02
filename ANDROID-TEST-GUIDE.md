# FedPromptly Muse Audit — Android Test Guide

## Test artifact

- APK: `app/build/outputs/apk/debug/app-debug.apk`
- Application ID: `com.fedpromptly.museaudit`
- Version: `1.0.0` / version code `1`
- Minimum Android version: Android 7.0 (API 24)
- Target Android version: API 35
- Network: **not required for the bundled site**, but required for external links and payment/community resources

## Option 1: Install directly on an Android phone

1. On the phone, enable **Developer options**:
   - Open **Settings → About phone**.
   - Tap **Build number** seven times.
   - Return to Settings and open **Developer options**.
   - Enable **USB debugging**.
2. Connect the phone to the computer with USB.
3. Accept the USB debugging authorization prompt on the phone.
4. From the folder containing the APK, run:

```bash
adb devices
adb install -r FedPromptlyMuseAudit-debug.apk
```

5. Open **FedPromptly Muse Audit** from the launcher.

If Android blocks the install, enable **Install unknown apps** for the file manager or browser being used to open the APK. The debug APK is not Play Store-signed.

## Option 2: Install with Android Studio

1. Open Android Studio.
2. Choose **Profile or Debug APK**.
3. Select `FedPromptlyMuseAudit-debug.apk`.
4. Connect an Android phone or start an emulator.
5. Click **Run** or install the APK from the APK analyzer.

To build from source instead, open the extracted Android project ZIP in Android Studio and run the `app` configuration. The project can also be built from a terminal with:

```bash
./gradlew assembleDebug
```

## Option 3: Install on an Android emulator with ADB

1. Start an emulator from Android Studio's Device Manager.
2. Confirm it is visible:

```bash
adb devices
```

3. Install the APK:

```bash
adb install -r FedPromptlyMuseAudit-debug.apk
```

## Manual acceptance checklist

### Launch and offline behavior

- [ ] App launches without crashing.
- [ ] Home page displays the FedPromptly/Muse by Meta usage-audit companion content.
- [ ] Turn on airplane mode, force-close the app, and relaunch it.
- [ ] Home page still loads in airplane mode.
- [ ] Scrolling works vertically and text remains readable.
- [ ] The app stays in portrait orientation.

### Internal navigation

- [ ] Tap the Home, Support, Privacy, Terms, and Accessibility navigation links.
- [ ] Each internal page opens inside the app.
- [ ] Use the Android back button to return to the previous page.
- [ ] Tap **Usage Audit Mode**, **Docs**, and other local page links.
- [ ] Anchor links such as `#setup` scroll to the correct section.

### Site interactions

- [ ] Tap **Reading mode** and confirm the visual mode changes.
- [ ] Close and reopen the app; confirm the reading-mode preference persists.
- [ ] Scroll through animated/reveal sections.
- [ ] Tap the private Matrix link and confirm the age/eligibility dialog appears.
- [ ] Cancel the dialog and confirm it closes without leaving the app.

### External links

Turn airplane mode off before this section.

- [ ] Tap an external HTTPS link and confirm it opens in the device browser.
- [ ] Tap an email address and confirm an installed mail app/handler opens, if available.
- [ ] Confirm the app does not attempt to render external sites inside the offline bundle.
- [ ] If the payment section is present, confirm it needs internet access; do not complete a purchase as part of this test.

### Back button and lifecycle

- [ ] Press Back on a nested local page and return to the previous page.
- [ ] Press Back on the home page and confirm Android exits the app normally.
- [ ] Rotate or background/restore the app and confirm it remains stable.

## Expected limitations

- This is a debug APK, not a release-signed Play Store package.
- External links, payment SDKs, social sites, and email handlers require internet and compatible apps.
- No Android emulator or physical device is attached to this sandbox, so installation and device-level UI behavior must be tested on your device/emulator.
- The site is bundled locally; updating the website requires rebuilding the APK.

## Troubleshooting

### `adb: command not found`

Install Android SDK Platform Tools through Android Studio's SDK Manager, then reconnect the phone and run `adb devices` again.

### `INSTALL_FAILED_VERSION_DOWNGRADE`

Uninstall the existing app first, or use a higher version code:

```bash
adb uninstall com.fedpromptly.museaudit
adb install FedPromptlyMuseAudit-debug.apk
```

### Blank page

Confirm that the APK was copied completely and that the app was installed from the supplied file. Reinstall with:

```bash
adb install -r FedPromptlyMuseAudit-debug.apk
```

### External links do not open

Make sure the phone has a browser or other compatible handler installed. The offline pages themselves should still work without external-link support.
