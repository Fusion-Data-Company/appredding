import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { errorHandler } from "@/utils/error-handler";

// Timeout configuration
const API_TIMEOUT = 30000; // 30 seconds
const RETRY_DELAYS = [1000, 2000, 4000]; // Exponential backoff: 1s, 2s, 4s

// Timeout wrapper for fetch requests
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = API_TIMEOUT): Promise<Response> {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), timeout);

  try {
    // Merge external signal (from React Query) with timeout signal
    let mergedSignal: AbortSignal;
    
    if (options.signal) {
      // If there's an external signal, we need to listen to both
      // Create a merged controller that aborts when either signal aborts
      if ('any' in AbortSignal && typeof AbortSignal.any === 'function') {
        // Use AbortSignal.any() if available (modern browsers)
        mergedSignal = AbortSignal.any([options.signal, timeoutController.signal]);
      } else {
        // Fallback: manually merge signals for older browsers
        const mergedController = new AbortController();
        mergedSignal = mergedController.signal;
        
        const abortMerged = () => mergedController.abort();
        options.signal.addEventListener('abort', abortMerged, { once: true });
        timeoutController.signal.addEventListener('abort', abortMerged, { once: true });
      }
    } else {
      // No external signal, just use timeout signal
      mergedSignal = timeoutController.signal;
    }

    const response = await fetch(url, {
      ...options,
      signal: mergedSignal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      // Check if this was a timeout abort or external abort
      if (timeoutController.signal.aborted && (!options.signal || !options.signal.aborted)) {
        const timeoutError = new Error(`Request timeout after ${timeout}ms`);
        timeoutError.name = 'TimeoutError';
        throw timeoutError;
      }
      // Otherwise, it was aborted by the external signal (React Query cancellation)
      throw error;
    }
    throw error;
  }
}

// Enhanced error handling with detailed error types
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorMessage = res.statusText;
    let errorDetails = '';

    try {
      const text = await res.text();
      errorMessage = text || res.statusText;
      
      // Try to parse as JSON for structured errors
      try {
        const json = JSON.parse(text);
        if (json.message) errorMessage = json.message;
        if (json.error) errorDetails = json.error;
      } catch {
        // Not JSON, use text as-is
      }
    } catch {
      // Failed to read response body
    }

    const error = new Error(`${res.status}: ${errorMessage}${errorDetails ? ` (${errorDetails})` : ''}`);
    (error as any).status = res.status;
    (error as any).statusText = res.statusText;
    
    // Log API errors
    errorHandler.reportManualError(
      `API Error: ${res.status} ${res.url} - ${errorMessage}`,
      'api_error'
    );
    
    throw error;
  }
}

// Check if error is retryable
function isRetryableError(error: any): boolean {
  // Don't retry client errors (400-499), except for specific cases
  if (error.status >= 400 && error.status < 500) {
    // Retry on 408 (Request Timeout), 429 (Too Many Requests)
    return error.status === 408 || error.status === 429;
  }
  
  // Retry on network errors and server errors (500+)
  if (error.status >= 500) return true;
  if (error.name === 'TimeoutError') return true;
  if (error.message?.includes('Failed to fetch')) return true;
  if (error.message?.includes('Network request failed')) return true;
  
  return false;
}

// Enhanced API request with retry logic and timeout
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  options: { timeout?: number; retries?: number } = {}
): Promise<Response> {
  const { timeout = API_TIMEOUT, retries = 3 } = options;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(
        url,
        {
          method,
          headers: data ? { "Content-Type": "application/json" } : {},
          body: data ? JSON.stringify(data) : undefined,
          credentials: "include",
        },
        timeout
      );

      await throwIfResNotOk(res);
      return res;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on last attempt or if error is not retryable
      if (attempt === retries || !isRetryableError(error)) {
        break;
      }

      // Wait before retrying with exponential backoff
      const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
      if (import.meta.env.DEV) {
        console.warn(`API request failed, retrying in ${delay}ms... (attempt ${attempt + 1}/${retries})`, error);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // All retries failed
  throw lastError;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
  timeout?: number;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior, timeout = API_TIMEOUT }) =>
  async ({ queryKey, signal }) => {
    try {
      const res = await fetchWithTimeout(
        queryKey[0] as string,
        {
          credentials: "include",
          signal, // Pass React Query's abort signal
        },
        timeout
      );

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      // Log query errors
      if (error instanceof Error) {
        errorHandler.reportManualError(
          `Query Error: ${queryKey[0]} - ${error.message}`,
          'api_error'
        );
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes - allow some caching
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Custom retry logic
        if (!isRetryableError(error)) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => {
        // Exponential backoff
        return Math.min(1000 * 2 ** attemptIndex, 30000);
      },
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Only retry mutations on network errors, not validation errors
        if (!isRetryableError(error)) return false;
        return failureCount < 2; // Fewer retries for mutations
      },
      retryDelay: (attemptIndex) => {
        return Math.min(1000 * 2 ** attemptIndex, 10000);
      },
    },
  },
});
