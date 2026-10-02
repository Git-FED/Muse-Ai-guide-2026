import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.resolve(process.argv[2] || path.join(root, 'release-artifacts'));
const output = path.resolve(process.argv[3] || path.join(root, 'signed-artifacts-manifest.json'));

function sha256(file) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(file);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

const entries = [];
const files = (await readdir(input, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .sort();
for (const name of files) {
  const file = path.join(input, name);
  entries.push({ name, sha256: await sha256(file), size: (await stat(file)).size });
}
await writeFile(output, `${JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), artifacts: entries }, null, 2)}\n`);
console.log(`Wrote ${entries.length} artifact records to ${output}`);
