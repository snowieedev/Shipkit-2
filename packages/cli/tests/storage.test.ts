import { describe, it, expect, beforeEach } from 'vitest';
import { getAuth, setAuth, clearAuth, getProjectConfig, setProjectConfig, clearProjectConfig } from '../src/lib/storage.js';

describe('Storage Manager', () => {
  beforeEach(() => {
    clearAuth();
    clearProjectConfig();
  });

  it('should store and retrieve auth data', () => {
    const mockAuth = {
      token: 'test-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    };

    setAuth(mockAuth);
    const auth = getAuth();
    expect(auth).toEqual(mockAuth);
  });

  it('should clear auth data', () => {
    const mockAuth = {
      token: 'test-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    };

    setAuth(mockAuth);
    clearAuth();
    const auth = getAuth();
    expect(auth).toBeUndefined();
  });

  it('should store and retrieve project config', () => {
    const mockConfig = {
      projectId: 'proj_123',
      framework: 'Next.js',
      providers: ['Supabase']
    };

    setProjectConfig(mockConfig);
    const config = getProjectConfig();
    expect(config).toEqual(mockConfig);
  });

  it('should clear project config', () => {
    const mockConfig = {
      projectId: 'proj_123',
    };

    setProjectConfig(mockConfig);
    clearProjectConfig();
    const config = getProjectConfig();
    expect(config).toEqual({});
  });
});
