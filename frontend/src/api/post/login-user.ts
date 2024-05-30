import axios from 'axios';
import { setCookie } from 'nookies';

interface Credentials {
  username: string;
  password: string;
}

export const handleLogin = async (credentials: Credentials) => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/auth/token/', credentials);
    setCookie(null, 'jwt', data.access, { maxAge: 60 * 60 * 24, path: '/' }); // 1 day expiry
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};
