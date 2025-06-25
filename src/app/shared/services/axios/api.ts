import { destroyCookie, parseCookies } from 'nookies';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';
import { ApiError } from 'next/dist/server/api-utils';
import { sysSession } from '~/src/app/shared/utils/constants/sysSession';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const api: AxiosInstance = axios.create({
  baseURL
});

api.interceptors.request.use(async (config) => {
  let token: string | null = null;
  let tokenType: string | null = null;

  getToken: {
    const cookies = parseCookies();
    const execfyCookies = cookies[sysSession];

    if (!execfyCookies) {
      break getToken;
    }

    try {
      const parsedExecfyCookies: AuthResponse = JSON.parse(execfyCookies);
      token = parsedExecfyCookies.access_token;
      tokenType = parsedExecfyCookies.token_type;
      // eslint-disable-next-line no-empty
    } catch {
      destroyCookie(null, sysSession);
      window.location.href = '/';
    }
  }

  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      const originalRequest = error.config;
      const token = originalRequest?.headers.Authorization;

      if (error.code === 'ERR_NETWORK') {
        throw new ApiError(503, 'Servidor indisponível ou fora do ar.');
      }

      if (error.response?.status === 401 && token) {
        destroyCookie(null, sysSession);
        return (window.location.href = '/');
      }

      throw new ApiError(401, error.response?.data.message || 'Usuário não autorizado.');
    }
  }
);
