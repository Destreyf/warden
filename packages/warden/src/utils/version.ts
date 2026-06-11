import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

let cachedVersion: string | undefined;

function readPackageVersion(path: string): string | undefined {
  try {
    const pkg = JSON.parse(readFileSync(path, 'utf-8')) as { version?: unknown };
    return typeof pkg.version === 'string' ? pkg.version : undefined;
  } catch {
    return undefined;
  }
}

export function getVersion(): string {
  if (cachedVersion) return cachedVersion;
  const __dirname = dirname(fileURLToPath(import.meta.url));
  cachedVersion =
    readPackageVersion(join(__dirname, '..', '..', 'package.json')) ??
    readPackageVersion(join(__dirname, 'package.json')) ??
    '0.0.0';
  return cachedVersion;
}

export function getMajorVersion(): string {
  return getVersion().split('.')[0] ?? '0';
}
