'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@/api';

/**
 * Server action to handle user logout
 * This function:
 * 1. Calls the logout API endpoint to invalidate the token on the server
 * 2. Removes the auth token cookie
 * 3. Redirects to the login page
 */
export async function logoutAction() {
  try {
    // Get the current token for the API call
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Call logout API endpoint if token exists
    if (token) {
      try {
        await api.auth.logout({ cookieToken: token });
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error);
      }
    }

    // Remove the auth token cookie
    cookieStore.delete('token');

    // Also remove any other auth-related cookies if they exist
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');
    cookieStore.delete('session');
  } catch (error) {
    console.error('Error during logout:', error);
    // Continue with logout even if there are errors
  } finally {
    // Always redirect to login page
    redirect('/login');
  }
}

/**
 * Client-side logout function that also handles cleanup
 * This should be used when you need to logout from client components
 */
export function clientLogout() {
  // Clear all auth-related data from localStorage/sessionStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('refreshToken');

    // Clear all cookies client-side
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
