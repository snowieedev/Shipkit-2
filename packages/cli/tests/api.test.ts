import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { api } from '../src/lib/api.js';
import * as storage from '../src/lib/storage.js';

vi.mock('axios', () => {
  return {
    default: {
      create: vi.fn(() => ({
        interceptors: {
          request: { use: vi.fn() }
        },
        post: vi.fn(),
        get: vi.fn()
      }))
    }
  };
});

vi.mock('../src/lib/storage.js', () => ({
  getAuth: vi.fn()
}));

// We need to re-import or cast to access the mocked functions
import { apiClient } from '../src/lib/api.js';

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('login should call post /cli/login', async () => {
    (apiClient.post as any).mockResolvedValue({
      data: { success: true, session: { access_token: '123' }, user: { id: '1' } }
    });

    const result = await api.login('test@example.com', 'password');
    expect(apiClient.post).toHaveBeenCalledWith('/cli/login', {
      email: 'test@example.com',
      password: 'password'
    });
    expect(result.success).toBe(true);
  });

  it('getProjects should call get /projects', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: { projects: [{ id: '1', name: 'Test' }] }
    });

    const result = await api.getProjects();
    expect(apiClient.get).toHaveBeenCalledWith('/projects');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test');
  });

  it('createProject should call post /projects', async () => {
    (apiClient.post as any).mockResolvedValue({
      data: { project: { id: '1', name: 'New Project' } }
    });

    const result = await api.createProject('New Project', 'Desc');
    expect(apiClient.post).toHaveBeenCalledWith('/projects', {
      name: 'New Project',
      description: 'Desc'
    });
    expect(result.name).toBe('New Project');
  });

  it('getProviders should call get /providers', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: { providers: [{ provider_name: 'Supabase' }] }
    });

    const result = await api.getProviders();
    expect(apiClient.get).toHaveBeenCalledWith('/providers');
    expect(result[0].provider_name).toBe('Supabase');
  });
});
