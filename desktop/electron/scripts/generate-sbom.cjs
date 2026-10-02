const fs = require('node:fs');
const path = require('node:path');

const packageLockPath = path.join(__dirname, '..', 'package-lock.json');
const outputPath = path.join(__dirname, '..', 'SBOM.json');
const lock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
const components = Object.entries(lock.packages ?? {})
  .filter(([name]) => name && name.startsWith('node_modules/'))
  .map(([name, value]) => ({
    type: 'library',
    name: name.slice('node_modules/'.length),
    version: value.version ?? 'unknown'
  }));

fs.writeFileSync(outputPath, `${JSON.stringify({
  bomFormat: 'CycloneDX',
  specVersion: '1.5',
  components
}, null, 2)}\n`);
console.log(`Wrote ${components.length} components to ${outputPath}`);
