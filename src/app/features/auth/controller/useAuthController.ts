'use client';

import { useCookie } from '~/src/app/shared/hooks/useCookie';
import { authCookieName } from '~/src/app/shared/utils/constants/authCookies';
import { useAuth } from '~/src/app/shared/hooks/useAuth';

export const useAuthController = () => {
  const { createSession, deleteCookie } = useCookie();
  const { changeHasToken, authPush, setIsLoading } = useAuth();

  const getToken = async (username: string, password: string) => {
    try {
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

      await fetch('https://spkhubapi.azurewebsites.net/token', requestOptions as RequestInit)
        .then((response) => response.json())
        .then((result) => {
          if (result.access_token) {
            const access_token = result.access_token;

            createSession({ access_token });
            changeHasToken();
            setIsLoading(false);
            return authPush();
          }

          return console.log('setar mensagem de erro');
        });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const logout = () => {
    deleteCookie(authCookieName!);
    changeHasToken();
    return authPush();
  };

  return { getToken, logout };
};
