import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AuthGuard } from '../src/lib/authGuard.js';
import * as storage from '../src/lib/storage.js';
import { APIKeyManager } from '../src/lib/apiKeyManager.js';

describe('AuthGuard', () => {
  let exitSpy: any;
  let logSpy: any;

  beforeEach(() => {
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('requireAuth', () => {
    it('should pass if auth exists', () => {
      const mockAuth = { token: 't', user: { id: '1', email: 'e', name: 'n' } };
      vi.spyOn(storage, 'getAuth').mockReturnValue(mockAuth);

      const auth = AuthGuard.requireAuth();
      expect(auth).toEqual(mockAuth);
      expect(exitSpy).not.toHaveBeenCalled();
    });

    it('should exit if auth is missing', () => {
      vi.spyOn(storage, 'getAuth').mockReturnValue(undefined);

      AuthGuard.requireAuth();
      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe('requireApiKey', () => {
    it('should pass if API key exists', () => {
      const mockKey = { apiKey: 'sk_live_123', userId: '1', createdAt: '2023' };
      vi.spyOn(APIKeyManager, 'getApiKey').mockReturnValue(mockKey);

      const key = AuthGuard.requireApiKey();
      expect(key).toEqual(mockKey);
      expect(exitSpy).not.toHaveBeenCalled();
    });

    it('should exit if API key is missing', () => {
      vi.spyOn(APIKeyManager, 'getApiKey').mockReturnValue(null);

      AuthGuard.requireApiKey();
      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe('requireFullyAuthenticated', () => {
    it('should pass if both auth and key exist', () => {
      const mockAuth = { token: 't', user: { id: '1', email: 'e', name: 'n' } };
      const mockKey = { apiKey: 'sk_live_123', userId: '1', createdAt: '2023' };
      
      vi.spyOn(storage, 'getAuth').mockReturnValue(mockAuth);
      vi.spyOn(APIKeyManager, 'getApiKey').mockReturnValue(mockKey);

      const result = AuthGuard.requireFullyAuthenticated();
      expect(result.auth).toEqual(mockAuth);
      expect(result.apiKeyData).toEqual(mockKey);
      expect(exitSpy).not.toHaveBeenCalled();
    });
  });
});
