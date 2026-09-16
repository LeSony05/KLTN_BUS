// admin/src/common/services/httpClient.ts
import axios from 'axios';
import { ADMIN_CONFIG } from '../config/constants';

export const httpClient = axios.create({
  baseURL: ADMIN_CONFIG.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add auth token if available
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (session expired)
      console.warn('Admin session expired or unauthorized');
    }
    return Promise.reject(error);
  }
);
