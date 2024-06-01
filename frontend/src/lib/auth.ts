import type { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import axios from 'axios'
import { setCookie } from 'nookies'
import { djangoHost } from '@/utils/api-helper'

export class AuthError extends Error { }

export async function verifyAuth(token: string) {

    if (!token) throw new AuthError('Missing user token')

    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
        )
        return verified.payload
    } catch (err) {
        throw new AuthError('Your token has expired.')
    }
}

export async function setUserCookie(credentials: { email: string, password: string }) {
    const response = await axios.post(djangoHost('/auth/token/'), credentials);
    setCookie(null, 'jwt', response.data.access, { maxAge: 60 * 10, path: '/' });
    setCookie(null, 'refresh_token', response.data.refresh, { maxAge: 60 * 60 * 24, path: '/' });

}

export function expireUserCookie(res: NextResponse) {
    res.cookies.set('jwt', '', { httpOnly: true, maxAge: 0 })
    return res
}