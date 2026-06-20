import axios from 'axios';
import { getAuth } from './storage.js';

const API_URL = process.env.SHIPKIT_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const auth = getAuth();
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export const api = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post('/cli/login', { email, password });
    return data;
  },
  getProjects: async () => {
    const { data } = await apiClient.get('/projects');
    return data.projects;
  },
  createProject: async (name: string, description?: string) => {
    const { data } = await apiClient.post('/projects', { name, description });
    return data.project;
  },
  getProviders: async () => {
    const { data } = await apiClient.get('/providers');
    return data.providers;
  },
};
