import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { APIKeyManager } from '../src/lib/apiKeyManager.js';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('APIKeyManager', () => {
  const testDir = path.join(os.homedir(), '.shipkit-test');
  const testPath = path.join(testDir, 'api.json');

  beforeEach(() => {
    // Mock the configDir getter
    vi.spyOn(APIKeyManager as any, 'configDir', 'get').mockReturnValue(testDir);
    vi.spyOn(APIKeyManager as any, 'configPath', 'get').mockReturnValue(testPath);

    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir, { recursive: true });
    }
  });

  it('should return null if API key file does not exist', () => {
    expect(APIKeyManager.getApiKey()).toBeNull();
  });

  it('should store and retrieve API key', () => {
    const key = 'sk_live_1234567890';
    const userId = 'usr_123';

    APIKeyManager.setApiKey(key, userId);

    const data = APIKeyManager.getApiKey();
    expect(data).not.toBeNull();
    expect(data?.apiKey).toBe(key);
    expect(data?.userId).toBe(userId);
    expect(data?.createdAt).toBeDefined();
  });

  it('should throw error when setting invalid API key', () => {
    expect(() => {
      APIKeyManager.setApiKey('invalid_key', 'usr_123');
    }).toThrow('Invalid API key format. Must start with sk_live_');
  });

  it('should handle corrupt file gracefully and return null', () => {
    // Create invalid json manually
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(testPath, '{"corrupt: data');

    expect(APIKeyManager.getApiKey()).toBeNull();
  });

  it('should return null if API key format is invalid in the file', () => {
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(testPath, JSON.stringify({ apiKey: 'sk_test_123', userId: 'usr_1' }));

    expect(APIKeyManager.getApiKey()).toBeNull();
  });

  it('should remove API key', () => {
    APIKeyManager.setApiKey('sk_live_123', 'usr_123');
    expect(APIKeyManager.getApiKey()).not.toBeNull();

    APIKeyManager.removeApiKey();
    expect(APIKeyManager.getApiKey()).toBeNull();
  });
});
