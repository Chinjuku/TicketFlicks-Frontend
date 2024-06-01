// utils/axiosInstance.ts
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { refreshToken } from '@/lib/refresh-token';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    "Content-Type": "Application/json"
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookies = parseCookies();
    const token = cookies['jwt'];

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        console.log(newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error(err)
        destroyCookie(null, 'jwt');
        destroyCookie(null, 'refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
