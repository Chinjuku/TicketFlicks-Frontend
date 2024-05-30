// src/app/api/protected-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth';
import { djangoHost } from '@/utils/api-helper';

const fetchUserData = async (userId: string, token: string) => {
  const response = await fetch(djangoHost(`/auth/${userId}/`), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
};

const handler = async (req: NextRequest, token: string) => {
  const user = (req as any).user;

  try {
    const userData = await fetchUserData(user.user_id, token);
    return NextResponse.json({ message: 'This is a protected route', user: userData, token: token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch user data', error: (err as Error).message }, { status: 500 });
  }
};

export const GET = authMiddleware(handler);

// qwertyuiop1.