'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@/api';

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
      try {
        await api.auth.logout({ cookieToken: token });
      } catch (error) {
        console.warn('Logout API call failed:', error);
      }
    }

    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');
    cookieStore.delete('session');
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    redirect('/login');
  }
}

export function clientLogout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('refreshToken');

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
