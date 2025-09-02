/**
 * Modern logout utility for Next.js with SSR + Client-side approach
 * This provides comprehensive logout functionality that works on both server and client
 */

export interface LogoutOptions {
  apiEndpoint?: string;
  redirectUrl?: string;
  clearStorage?: boolean;
  clearCookies?: string[];
}

const DEFAULT_OPTIONS: LogoutOptions = {
  apiEndpoint: '/api/auth/logout',
  redirectUrl: '/login',
  clearStorage: true,
  clearCookies: ['token', 'refreshToken', 'user', 'session'],
};

/**
 * Comprehensive logout function that handles both server and client-side cleanup
 */
export async function performLogout(options: LogoutOptions = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  try {
    // 1. Call logout API to invalidate token on server
    if (opts.apiEndpoint) {
      try {
        await fetch(opts.apiEndpoint, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.warn('Logout API call failed:', error);
        // Continue with logout even if API fails
      }
    }

    // 2. Clear client-side storage
    if (opts.clearStorage && typeof window !== 'undefined') {
      clearClientStorage();
    }

    // 3. Clear cookies
    if (opts.clearCookies && typeof window !== 'undefined') {
      clearClientCookies(opts.clearCookies);
    }

    // 4. Redirect to login
    if (opts.redirectUrl && typeof window !== 'undefined') {
      window.location.href = opts.redirectUrl;
    }
  } catch (error) {
    console.error('Error during logout:', error);
    // Fallback: force redirect even if other steps fail
    if (opts.redirectUrl && typeof window !== 'undefined') {
      window.location.href = opts.redirectUrl;
    }
  }
}

/**
 * Clear all auth-related data from localStorage and sessionStorage
 */
export function clearClientStorage() {
  if (typeof window === 'undefined') return;

  const authKeys = [
    'token',
    'accessToken',
    'refreshToken',
    'user',
    'userData',
    'session',
    'authToken',
    'jwt',
  ];

  authKeys.forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

/**
 * Clear specified cookies by setting them to expire
 */
export function clearClientCookies(cookieNames: string[]) {
  if (typeof window === 'undefined') return;

  cookieNames.forEach(name => {
    // Clear cookie for current domain
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Clear cookie for current domain and all subdomains
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;

    // Clear cookie for parent domain (in case of subdomain)
    const hostParts = window.location.hostname.split('.');
    if (hostParts.length > 1) {
      const parentDomain = '.' + hostParts.slice(-2).join('.');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${parentDomain};`;
    }
  });
}

/**
 * Create a logout server action (for use in server components)
 */
export function createLogoutServerAction() {
  return async function logoutServerAction() {
    'use server';

    const { cookies } = await import('next/headers');
    const { redirect } = await import('next/navigation');

    try {
      const cookieStore = await cookies();

      // Remove auth cookies on server
      cookieStore.delete('token');
      cookieStore.delete('refreshToken');
      cookieStore.delete('user');
      cookieStore.delete('session');
    } catch (error) {
      console.error('Error clearing server cookies:', error);
    } finally {
      redirect('/login');
    }
  };
}

/**
 * Ready-to-use logout function for client components
 */
export const logout = () => performLogout();

/**
 * Logout function with custom options
 */
export const logoutWithOptions = (options: LogoutOptions) =>
  performLogout(options);
