import { afterEach, describe, expect, it, vi } from 'vitest';

describe('getVersion', () => {
  afterEach(() => {
    vi.doUnmock('node:fs');
    vi.resetModules();
  });

  it('falls back to the bundled action manifest when the package root is unavailable', async () => {
    const readFileSync = vi.fn((path: string | URL) => {
      if (String(path).endsWith('/package.json') && readFileSync.mock.calls.length === 1) {
        throw Object.assign(new Error('missing package'), { code: 'ENOENT' });
      }
      return JSON.stringify({ version: '1.2.3' });
    });
    vi.doMock('node:fs', () => ({ readFileSync }));

    const { getVersion } = await import('./version.js');

    expect(getVersion()).toBe('1.2.3');
    expect(readFileSync).toHaveBeenCalledTimes(2);
  });
});
