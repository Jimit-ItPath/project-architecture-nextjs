import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Get cookies
    const cookieStore = await cookies();

    // Here you would typically:
    // 1. Validate the token
    // 2. Add token to blacklist/revoke on your backend
    // 3. Log the logout event

    const token = cookieStore.get('token')?.value;

    if (token) {
      // You can add your backend logout logic here
      // For example: await revokeToken(token);
      console.log('Token being logged out:', token);
    }

    // Clear server-side cookies
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Set cookies to expire (delete them)
    response.cookies.set('token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    response.cookies.set('refreshToken', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    response.cookies.set('user', '', {
      expires: new Date(0),
      path: '/',
    });

    response.cookies.set('session', '', {
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
