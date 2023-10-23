import { setCookie, destroyCookie } from 'nookies';
import { maxAge, authCookieName } from '../utils/constants/authCookies';

export const useCookie = () => {
  const createSession = (value: any) =>
    setCookie(null, authCookieName!, value, {
      maxAge: maxAge,
      path: '/'
    });

  const deleteCookie = (cookieName: string) => destroyCookie(null, cookieName);

  return {
    createSession,
    deleteCookie
  };
};
