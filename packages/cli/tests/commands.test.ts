import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Command } from 'commander';
import { logoutCommand } from '../src/commands/logout.js';
import * as storage from '../src/lib/storage.js';

vi.mock('../src/lib/storage.js', () => ({
  clearAuth: vi.fn(),
  getAuth: vi.fn()
}));

// Mock console.log and process.exit
const originalLog = console.log;
const originalExit = process.exit;

describe('Commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.log = vi.fn();
    (process as any).exit = vi.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    process.exit = originalExit;
  });

  it('logout should call clearAuth', async () => {
    await logoutCommand.parseAsync(['node', 'script']);
    expect(storage.clearAuth).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });

  it('logout should handle errors gracefully', async () => {
    (storage.clearAuth as any).mockImplementation(() => {
      throw new Error('Test error');
    });

    await logoutCommand.parseAsync(['node', 'script']);
    expect(console.log).toHaveBeenCalled();
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
