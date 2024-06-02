// lib/refreshToken.ts
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { djangoHost } from '../utils/api-helper';

export const refreshToken = async () => {
  const cookies = parseCookies();
  const refreshToken = cookies['refresh_token'];
  console.log(refreshToken)

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post('/api/auth/token/refresh/', {
      refresh: refreshToken,
    });
    console.log(response)
    setCookie(null, 'jwt', response.data.access, {
      maxAge: 60 * 10,
      path: '/',
    });

    console.log(response.data)
    return response.data.access;
  } catch (error) {
    destroyCookie(null, 'jwt');
    destroyCookie(null, 'refresh_token');
    console.error(error);
    throw new Error('Unable to refresh token');
  }
};
