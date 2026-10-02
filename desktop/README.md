# Desktop shells

Both desktop targets package the same offline-first files from `site/`. The static web app remains the single source of truth; neither desktop package maintains a second copy of the ledger or HTML pages in version control.

```text
desktop/
├── icons/                         # Canonical shared source icons
├── scripts/
│   └── sync-site.mjs              # Stages site/ for Electron packaging
├── electron/                      # Windows URL-to-app shell
│   ├── main.cjs                   # Hardened Electron main process
│   ├── package.json
│   └── README.md
└── tauri/                         # macOS URL-to-web-app shell
    ├── package.json
    ├── README.md
    └── src-tauri/
        ├── Cargo.toml
        ├── tauri.conf.json
        ├── src/main.rs
        └── icons/                 # Generated before a Tauri build
```

## Target matrix

| Target | Shell | Platform artifact | Shared-site strategy |
|---|---|---|---|
| Windows | Electron | x64 NSIS installer (`.exe`) | `site/` is staged into the app only during `npm start` or `npm run dist` |
| macOS | Tauri | `.app` bundle | Tauri packages `../../site` directly as its frontend distribution |

## Security model

- The desktop shells keep Node/native APIs unavailable to the web content.
- Internal navigation is limited to the bundled site.
- Only explicit `http:`, `https:`, and `mailto:` links may leave the app; they open in the operating system's default handler.
- Electron denies permission requests and webview attachment.
- Tauri enforces a local-only Content Security Policy and uses the native URL opener for allowed external links.

Build instructions are in the individual target READMEs. CI is defined once in [`../.github/workflows/build-all.yml`](../.github/workflows/build-all.yml).
