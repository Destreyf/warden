import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const packagePath = resolve(repoRoot, 'packages/warden/package.json');
const actionPackagePath = resolve(repoRoot, 'dist/action/package.json');

const pkg = JSON.parse(readFileSync(packagePath, 'utf-8')) as {
  name: string;
  version: string;
};

writeFileSync(
  actionPackagePath,
  `${JSON.stringify({ name: pkg.name, version: pkg.version, type: 'module' }, null, 2)}\n`
);
