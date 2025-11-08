/**
 * API Service - Base Axios Configuration
 * 
 * This file sets up our HTTP client with:
 * - Base URL configuration
 * - Request/response interceptors
 * - Error handling
 * - Timeout settings
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '@/constants';
import type { ApiError, ApiResponse } from '@/types';

// ============================================
// CREATE AXIOS INSTANCE
// ============================================

const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

api.interceptors.request.use(
  (config) => {
    // Add auth token if available (for admin routes later)
    const token = localStorage.getItem('portfolio_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log responses in development
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      console.log('✅ API Response:', response.config.url, response.status);
    }
    return response;
  },
  (error: AxiosError) => {
    // Log errors in development
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      console.error('❌ API Error:', error.config?.url, error.response?.status);
    }
    
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const apiError: ApiError = {
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        details: error.response.data,
      };
      return Promise.reject(apiError);
    } else if (error.request) {
      // Request made but no response received
      const apiError: ApiError = {
        message: 'Network error - could not reach server',
        status: 0,
      };
      return Promise.reject(apiError);
    } else {
      // Something else happened
      const apiError: ApiError = {
        message: error.message || 'An unexpected error occurred',
      };
      return Promise.reject(apiError);
    }
  }
);

// ============================================
// GENERIC API METHODS
// ============================================

/**
 * Generic GET request
 */
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api.get<T>(url, config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as ApiError).message,
    };
  }
}

/**
 * Generic POST request
 */
export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api.post<T>(url, data, config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as ApiError).message,
    };
  }
}

/**
 * Generic PUT request
 */
export async function put<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api.put<T>(url, data, config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as ApiError).message,
    };
  }
}

/**
 * Generic DELETE request
 */
export async function del<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api.delete<T>(url, config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as ApiError).message,
    };
  }
}

// Export the axios instance for direct use if needed
export default api;
