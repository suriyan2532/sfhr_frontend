/**
 * API Client for Backend Communication
 *
 * This module provides a centralized HTTP client for communicating with the backend API.
 * It handles authentication, error handling, and request/response formatting.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "APIError";
  }
}

interface FetchOptions extends RequestInit {
  token?: string;
}

/**
 * Generic fetch wrapper with authentication and error handling
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  // Get token from session if not provided
  const authToken = token;
  // TODO: Implement session token retrieval when auth is configured
  // if (!authToken && typeof window === "undefined") {
  //   const session = await getServerSession();
  //   authToken = session?.user?.accessToken;
  // }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add custom headers from options
  if (fetchOptions.headers) {
    Object.entries(fetchOptions.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        headers[key] = value;
      }
    });
  }

  if (authToken) {
    headers["x-access-token"] = authToken;
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorData = isJson ? await response.json() : await response.text();
      throw new APIError(
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData,
      );
    }

    // Return parsed JSON or empty object for 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return isJson ? await response.json() : ({} as T);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Network or other errors
    throw new APIError(
      error instanceof Error ? error.message : "Network error occurred",
      0,
      error,
    );
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "GET",
  });
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions,
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions,
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
}

/**
 * Build query string from params object
 */
export function buildQueryString(
  params: Record<string, unknown> | { [key: string]: unknown },
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
