const { app, BrowserWindow, Menu, shell, Tray } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { fileURLToPath, pathToFileURL } = require('node:url');

const SITE_DIRECTORY = path.join(__dirname, 'site');
const HOME_PAGE = path.join(SITE_DIRECTORY, 'index.html');
const DEFAULT_CONFIG = {
  startUrl: 'local',
  allowedHosts: [],
  windowTitle: 'FedPromptly Muse Audit',
  theme: 'dark',
  closeToTray: false,
  openExternalProtocols: ['http:', 'https:', 'mailto:']
};
const EXTERNAL_PROTOCOLS = new Set(DEFAULT_CONFIG.openExternalProtocols);
let runtimeConfig = DEFAULT_CONFIG;
let mainWindow;
let tray;

function readRuntimeConfig() {
  const candidates = [
    path.join(process.resourcesPath, 'app.config.json'),
    path.join(__dirname, 'resources', 'app.config.json')
  ];
  for (const configPath of candidates) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
    } catch {
      // Use the next candidate or the safe offline defaults.
    }
  }
  return DEFAULT_CONFIG;
}

function isInsideSharedSite(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'file:') return false;
    const destination = fileURLToPath(parsed);
    const relativePath = path.relative(SITE_DIRECTORY, destination);
    return relativePath === '' || (
      relativePath !== '..' &&
      !relativePath.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relativePath)
    );
  } catch {
    return false;
  }
}

function isAllowedConfiguredUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      runtimeConfig.allowedHosts.includes(parsed.hostname);
  } catch {
    return false;
  }
}

function openExternalIfAllowed(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (EXTERNAL_PROTOCOLS.has(parsed.protocol)) void shell.openExternal(parsed.toString());
  } catch {
    // Invalid destinations remain blocked.
  }
}

function blockOrAllowNavigation(event, rawUrl) {
  if (isInsideSharedSite(rawUrl) || isAllowedConfiguredUrl(rawUrl)) return;
  event.preventDefault();
  openExternalIfAllowed(rawUrl);
}

function createTray() {
  if (!runtimeConfig.closeToTray || tray) return;
  tray = new Tray(path.join(__dirname, 'build', 'tray-icon.png'));
  tray.setToolTip(runtimeConfig.windowTitle);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow?.show() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ]));
  tray.on('double-click', () => mainWindow?.show());
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 720,
    minHeight: 560,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#0b1220',
    title: runtimeConfig.windowTitle,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  });

  mainWindow.webContents.session.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  mainWindow.webContents.session.setPermissionCheckHandler(() => false);
  mainWindow.webContents.on('will-attach-webview', (event) => event.preventDefault());
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedConfiguredUrl(url)) {
      void mainWindow.loadURL(url);
    } else {
      openExternalIfAllowed(url);
    }
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', blockOrAllowNavigation);
  mainWindow.webContents.on('will-redirect', blockOrAllowNavigation);
  mainWindow.on('close', (event) => {
    if (runtimeConfig.closeToTray && tray && !app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
  mainWindow.once('ready-to-show', () => mainWindow.show());

  if (runtimeConfig.startUrl === 'local') {
    void mainWindow.loadFile(HOME_PAGE);
  } else if (isAllowedConfiguredUrl(runtimeConfig.startUrl)) {
    void mainWindow.loadURL(runtimeConfig.startUrl);
  } else {
    void mainWindow.loadURL(pathToFileURL(HOME_PAGE).toString());
  }
  createTray();
}

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
  app.whenReady().then(() => {
    runtimeConfig = readRuntimeConfig();
    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on('before-quit', () => { app.isQuiting = true; });
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && !runtimeConfig.closeToTray) app.quit();
});
