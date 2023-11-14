import { CreateSession, useCookie } from '~/src/app/shared/hooks/useCookie';
import { useAuth } from '~/src/app/shared/hooks/useAuth';

export const useSystemAuth = () => {
  const { createSession } = useCookie();
  const { setIsLoading } = useAuth();

  const getSystemToken = async () => {
    try {
      const endpoint = '/token';
      const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_STORAGE_NAME!;
      const SYS_USERNAME = process.env.NEXT_PUBLIC_SYS_USERNAME!;
      const SYS_PASS = process.env.NEXT_PUBLIC_SYS_PASS!;
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const URL = `${BASE_URL}${endpoint}`;

      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('grant_type', 'password');
      urlencoded.append('username', SYS_USERNAME);
      urlencoded.append('password', SYS_PASS);

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

            const createSessionCookie: CreateSession = {
              cookieName: AUTH_COOKIE_NAME,
              value: access_token
            };

            return createSession(createSessionCookie);
          }
        });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getSystemToken };
};
