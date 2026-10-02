import { access, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..', '..');
const sharedSite = path.join(repositoryRoot, 'site');
const electronSite = path.join(repositoryRoot, 'desktop', 'electron', 'site');
const ignoredDirectories = new Set([
  '.agent_hooks',
  '.browser_data',
  '.github',
  '.psiphon_data',
  '.screenshots',
  'discussion',
  'prompts',
  'wiki'
]);

function usage() {
  console.error('Usage: node ../scripts/sync-site.mjs electron');
  process.exitCode = 1;
}

function includeSource(sourcePath) {
  const relativePath = path.relative(sharedSite, sourcePath);
  if (!relativePath) return true;
  return !relativePath.split(path.sep).some((part) => ignoredDirectories.has(part));
}

async function requirePath(filePath, label) {
  try {
    await access(filePath);
  } catch {
    throw new Error(`${label} is missing: ${filePath}`);
  }
}

async function syncElectronSite() {
  await requirePath(path.join(sharedSite, 'index.html'), 'Shared site entry point');
  await requirePath(path.join(sharedSite, 'assets'), 'Shared site assets');

  await rm(electronSite, { recursive: true, force: true });
  await cp(sharedSite, electronSite, {
    recursive: true,
    filter: includeSource
  });

  await requirePath(path.join(electronSite, 'index.html'), 'Staged Electron entry point');
  await requirePath(path.join(electronSite, 'assets'), 'Staged Electron assets');
  console.log(`Staged shared site at ${path.relative(repositoryRoot, electronSite)}`);
}

if (process.argv[2] !== 'electron') {
  usage();
} else {
  syncElectronSite().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
