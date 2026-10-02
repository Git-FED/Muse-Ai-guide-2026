import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fail(message) {
  throw new Error(message);
}

async function requireFile(relativePath) {
  try {
    await access(path.join(root, relativePath));
  } catch {
    fail(`Missing required file: ${relativePath}`);
  }
}

async function readJson(relativePath) {
  const contents = await readFile(path.join(root, relativePath), 'utf8');
  try {
    return JSON.parse(contents);
  } catch (error) {
    fail(`${relativePath} is not valid JSON: ${error.message}`);
  }
}

function requireValue(condition, message) {
  if (!condition) fail(message);
}

function syntaxCheck(relativePath) {
  const result = spawnSync(process.execPath, ['--check', path.join(root, relativePath)], {
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    fail(`${relativePath} failed syntax validation:\n${result.stderr || result.stdout}`);
  }
}

for (const file of [
  'site/index.html',
  'site/manifest.webmanifest',
  'site/assets/js/app.js',
  'site/assets/js/ledger.js',
  'desktop/icons/fedpromptly-icon.ico',
  'desktop/icons/fedpromptly-icon.png',
  'desktop/electron/main.cjs',
  'desktop/electron/package.json',
  'desktop/electron/electron-builder.yml',
  'desktop/electron/resources/app.config.json',
  'desktop/electron/resources/app.config.schema.json',
  'desktop/electron/resources/latest.yml.example',
  'desktop/electron/build/icon.ico',
  'desktop/electron/build/installerIcon.ico',
  'desktop/electron/build/uninstallerIcon.ico',
  'desktop/electron/build/tray-icon.png',
  'desktop/electron/test/security.test.cjs',
  'desktop/electron/test/loopback-server.test.cjs',
  'desktop/electron/src/auth/loopback-server.cjs',
  'desktop/tauri/package.json',
  'desktop/tauri/src-tauri/Cargo.toml',
  'desktop/tauri/src-tauri/tauri.conf.json',
  'desktop/tauri/src-tauri/capabilities/default.json',
  'desktop/tauri/src-tauri/.taurignore',
  'desktop/tauri/src-tauri/rust-toolchain.toml',
  'desktop/tauri/src-tauri/icons/tray-icon.png',
  'desktop/tauri/latest.json.example',
  'desktop/tauri/src-tauri/src/main.rs',
  '.github/workflows/build-all.yml'
]) {
  await requireFile(file);
}

const electronPackage = await readJson('desktop/electron/package.json');
requireValue(electronPackage.main === 'main.cjs', 'Electron entry point must be main.cjs.');
requireValue(electronPackage.scripts?.['prepare:site'], 'Electron must stage the shared site before packaging.');
requireValue(electronPackage.scripts?.dist, 'Electron dist script is missing.');

const electronBuilder = await readFile(path.join(root, 'desktop/electron/electron-builder.yml'), 'utf8');
requireValue(electronBuilder.includes('build/icon.ico'), 'Electron builder must reference the Windows app icon.');
requireValue(electronBuilder.includes('build/installerIcon.ico'), 'Electron builder must reference the installer icon.');
requireValue(electronBuilder.includes('build/tray-icon.png'), 'Electron builder must package the tray icon.');
requireValue(electronBuilder.includes('extraResources:'), 'Electron runtime config must be an extra resource.');

const electronConfig = await readJson('desktop/electron/resources/app.config.json');
requireValue(electronConfig.startUrl === 'local', 'Electron must default to the offline local site.');
requireValue(Array.isArray(electronConfig.allowedHosts), 'Electron allowedHosts must be an explicit array.');

const tauriPackage = await readJson('desktop/tauri/package.json');
requireValue(tauriPackage.scripts?.['generate:icons'], 'Tauri icon generation script is missing.');
requireValue(tauriPackage.scripts?.['build:macos'], 'Tauri macOS build script is missing.');

const tauriConfig = await readJson('desktop/tauri/src-tauri/tauri.conf.json');
requireValue(
  tauriConfig.build?.frontendDist === '../../../site',
  'Tauri must package the shared site directly from the repository root.'
);
requireValue(
  Array.isArray(tauriConfig.bundle?.icon) && tauriConfig.bundle.icon.includes('icons/icon.icns'),
  'Tauri macOS bundle must reference the generated ICNS icon.'
);
requireValue(
  tauriConfig.app?.security?.csp?.includes("default-src 'self'"),
  'Tauri requires the local-first content security policy.'
);
requireValue(
  tauriConfig.app?.windows?.[0]?.create === false,
  'Tauri must defer primary-window creation so the Rust navigation policy is attached.'
);
requireValue(tauriConfig.app?.trayIcon?.iconPath === 'icons/tray-icon.png', 'Tauri tray icon path is incorrect.');

const cargoToml = await readFile(path.join(root, 'desktop/tauri/src-tauri/Cargo.toml'), 'utf8');
requireValue(cargoToml.includes('open = '), 'Tauri must use the native URL opener for external links.');

const tauriMain = await readFile(path.join(root, 'desktop/tauri/src-tauri/src/main.rs'), 'utf8');
requireValue(tauriMain.includes('.on_navigation('), 'Tauri must enforce its navigation policy.');
requireValue(tauriMain.includes('.on_new_window('), 'Tauri must block popup windows.');
requireValue(tauriMain.includes('NewWindowResponse::Deny'), 'Tauri popup requests must be denied.');

const workflow = await readFile(path.join(root, '.github/workflows/build-all.yml'), 'utf8');
requireValue(workflow.includes('electron-windows:'), 'GitHub workflow lacks an Electron Windows build job.');
requireValue(workflow.includes('tauri-macos:'), 'GitHub workflow lacks a Tauri macOS build job.');
requireValue(workflow.includes('npm ci'), 'GitHub workflow should use locked Node dependencies.');

syntaxCheck('desktop/electron/main.cjs');
syntaxCheck('desktop/electron/src/auth/loopback-server.cjs');
syntaxCheck('desktop/scripts/sync-site.mjs');
syntaxCheck('scripts/verify-desktop.mjs');
syntaxCheck('scripts/create-release-manifest.mjs');

console.log('Desktop structure validation passed.');
