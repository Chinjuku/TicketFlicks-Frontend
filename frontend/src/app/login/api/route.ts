// src/app/login/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { djangoHost } from '@/utils/api-helper';
import { verifyAuth } from '@/lib/auth';

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

const handler = async (req: NextRequest) => {
  const token = req.cookies.get('jwt')?.value || req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const user = await verifyAuth(token)
    const userData = await fetchUserData(user.user_id as string, token);
    return NextResponse.json({ message: 'This is a protected route', user: userData, token: token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch user data', error: (err as Error).message }, { status: 500 });
  }
};

export const GET = handler;


