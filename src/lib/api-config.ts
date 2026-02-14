/**
 * API Configuration and Utilities
 *
 * This module provides centralized API configuration and helper functions
 * for making requests to the backend API.
 */

// Get API URL from environment variables
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    me: `${API_BASE_URL}/auth/me`,
  },

  // User endpoints
  users: {
    list: `${API_BASE_URL}/users`,
    create: `${API_BASE_URL}/users`,
    get: (id: string) => `${API_BASE_URL}/users/${id}`,
    update: (id: string) => `${API_BASE_URL}/users/${id}`,
    delete: (id: string) => `${API_BASE_URL}/users/${id}`,
  },

  // Employee endpoints
  employees: {
    list: `${API_BASE_URL}/employees`,
    create: `${API_BASE_URL}/employees`,
    get: (id: string) => `${API_BASE_URL}/employees/${id}`,
    update: (id: string) => `${API_BASE_URL}/employees/${id}`,
    delete: (id: string) => `${API_BASE_URL}/employees/${id}`,
  },

  // Dashboard endpoints
  dashboard: {
    employee: `${API_BASE_URL}/dashboard/employee`,
    manager: `${API_BASE_URL}/dashboard/manager`,
    company: `${API_BASE_URL}/dashboard/company`,
  },

  // Add more endpoints as needed
};

/**
 * Helper function to make API requests
 *
 * @param endpoint - The API endpoint URL
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Promise with the response data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

/**
 * Helper function for GET requests
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiGet<T = any>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: "GET" });
}

/**
 * Helper function for POST requests
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiPost<T = any>(
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Helper function for PUT requests
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiPut<T = any>(
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Helper function for DELETE requests
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiDelete<T = any>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: "DELETE" });
}
