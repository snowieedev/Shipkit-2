import axios from 'axios';
import { getAuth } from './storage.js';

const API_URL = process.env.SHIPKIT_API_URL || 'https://shipkit-bice.vercel.app';

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || (error.name === 'AggregateError' && !error.message)) {
      error.message = `Could not connect to ShipKit API at ${error.config?.baseURL || API_URL}. Is the server running?`;
    }
    return Promise.reject(error);
  }
);

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
