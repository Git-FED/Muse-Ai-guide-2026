# Complete desktop tree

This is the checked-in structure for the two requested wrappers. Generated build output (`node_modules/`, Electron `site/`, Rust `target/`, installer files, and unsigned release artifacts) is intentionally excluded from version control and recreated by the documented commands.

```text
FedPromptlyMuseAudit/
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       ├── build-all.yml                 # Web, Android, Electron, Tauri matrix
│       ├── build-win.yml                 # Focused Windows Electron build
│       ├── codeql.yml                    # JavaScript/Rust scanning
│       ├── dependency-audit.yml          # npm audit + cargo audit
│       ├── release.yml                   # Manual unsigned release-readiness build
│       └── test-macos.yml                # fmt, test, clippy
├── certs/.gitkeep                         # Certificates never committed
├── desktop/
│   ├── README.md
│   ├── icons/
│   │   ├── fedpromptly-icon.svg          # Vector master
│   │   ├── fedpromptly-icon.png          # Raster master
│   │   └── fedpromptly-icon.ico          # Windows source icon
│   ├── scripts/sync-site.mjs             # Stage shared site for Electron
│   ├── electron/                         # Windows URL-to-app
│   │   ├── build/
│   │   │   ├── icon.ico                  # Windows app icon
│   │   │   ├── icon.png                  # Master build resource
│   │   │   ├── tray-icon.png             # Separate tray icon
│   │   │   ├── installerIcon.ico
│   │   │   ├── installerHeaderIcon.ico
│   │   │   ├── uninstallerIcon.ico
│   │   │   ├── license.txt
│   │   │   └── installer.nsh
│   │   ├── resources/
│   │   │   ├── app.config.json           # Editable extraResources runtime config
│   │   │   ├── app.config.example.json
│   │   │   ├── app.config.schema.json
│   │   │   └── latest.yml.example        # Disabled updater manifest example
│   │   ├── src/auth/loopback-server.cjs  # Optional localhost OAuth primitive
│   │   ├── test/security.test.cjs        # External URL protocol tests
│   │   ├── test/loopback-server.test.cjs
│   │   ├── scripts/
│   │   │   ├── generate-sbom.cjs
│   │   │   └── verify-signature.ps1
│   │   ├── main.cjs                      # Single-instance hardened shell
│   │   ├── electron-builder.yml          # Packaging, icons, NSIS, resources
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── .env.example
│   │   ├── .npmrc
│   │   ├── .nvmrc
│   │   ├── dev-app-update.yml           # Disabled updater template
│   │   ├── ARCHITECTURE.md
│   │   └── README.md
│   └── tauri/                            # macOS URL-to-web app
│       ├── src-tauri/
│   │   ├── src/main.rs               # Rust shell, navigation, popup policy
│   │   ├── src/auth/loopback.rs      # Optional localhost OAuth primitive
│   │   ├── tests/security_test.rs
│   │   ├── tests/loopback_test.rs
│   │   ├── capabilities/default.json # Tauri v2 permissions
│   │   ├── capabilities/examples/    # Disabled updater/deep-link/notification examples
│       │   ├── icons/                    # tauri icon generated set
│       │   │   ├── 32x32.png
│       │   │   ├── 128x128.png
│       │   │   ├── 128x128@2x.png
│       │   │   ├── icon.icns
│       │   │   ├── icon.ico
│       │   │   ├── icon.png
│       │   │   ├── tray-icon.png
│       │   │   └── tray-icon@2x.png
│       │   ├── macos/
│       │   │   ├── Info.plist
│       │   │   ├── Entitlements.plist
│       │   │   └── PrivacyInfo.xcprivacy
│       │   ├── Cargo.toml
│       │   ├── Cargo.lock
│       │   ├── build.rs
│       │   ├── tauri.conf.json
│       │   ├── .taurignore
│       │   ├── rust-toolchain.toml
│       │   ├── rustfmt.toml
│       │   └── clippy.toml
│       ├── scripts/notarize.sh
│       ├── scripts/verify-notarization.sh
│       ├── .cargo/config.toml
│       ├── .env.example
│       ├── package.json
│       ├── package-lock.json
│       └── README.md
├── scripts/verify-desktop.mjs              # Cross-target structural gate
├── scripts/create-release-manifest.mjs     # SHA-256/size manifest generator
├── DESKTOP-OPTIONAL-FEATURES.md
├── RELEASE-READINESS.md                    # Signing/notarization/publishing guide
├── SBOM.example.json
├── signed-artifacts-manifest.example.json
├── COMPLETE-DESKTOP-TREE.md
├── .editorconfig
├── .gitattributes
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── SECURITY.md
```

**Not included by design:** real `.pfx`/`.p12` certificates, signing passwords, OAuth credentials, GitHub tokens, updater endpoints, crash-reporting DSNs, `node_modules`, Rust `target/`, generated Electron staging, and release binaries. Those belong in protected CI or local secret stores and are documented in `RELEASE-READINESS.md`.
