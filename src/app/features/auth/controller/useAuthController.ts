'use client';

/**
 * @function getToken autentica o usuário
 * @function getSystemToken autentica o sistema para ter acesso às requests
 */

import { SYS_AUTH_STORAGE_NAME } from '~/src/app/shared/utils/constants/authStorage';
import { useAuth } from '~/src/app/shared/hooks/useAuth';
import { useSystemAuth } from './useSystemAuth';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { useCookie } from '~/src/app/shared/hooks/useCookie';

export const useAuthController = () => {
  const { deleteCookie } = useCookie();
  const { setLocalStorage, deleteFromStorage } = useLocalStorage();
  const { push } = useRouter();
  const { setIsLoading, setErrorMessage } = useAuth();
  const { getSystemToken } = useSystemAuth();

  const session = '_S';

  const getToken = async (username: string, password: string) => {
    try {
      const endpoint = '/token';
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const URL = `${BASE_URL}${endpoint}`;

      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('grant_type', 'password');
      urlencoded.append('username', username);
      urlencoded.append('password', password);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      await fetch(URL, requestOptions as RequestInit)
        .then((response) => response.json())
        .then((result) => {
          if (result.access_token) {
            const access_token = result.access_token;

            const userSessionValue = {
              _a: access_token,
              username
            };

            getSystemToken();
            setLocalStorage(session, userSessionValue);
            return push(APP_ROUTES.private.dashboard.name);
          }

          return setErrorMessage(`Usuário ou senha incorretos`);
        });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    deleteCookie(SYS_AUTH_STORAGE_NAME!);
    deleteFromStorage(session!);
    return push(APP_ROUTES.public.auth);
  };

  return { getToken, logout };
};
