// utils/refreshToken.ts
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { djangoHost } from '../utils/api-helper';

export const refreshToken = async () => {
  const cookies = parseCookies();
  const refreshToken = cookies['refresh_token'];

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post(djangoHost('/auth/token/refresh/'), {
      refresh: refreshToken,
    });

    setCookie(null, 'jwt', response.data.access, {
      maxAge: 60 * 5,
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
