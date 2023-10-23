'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../utils/constants/app-routes';

const cookies = parseCookies();
const userToken = cookies.IALOGUE;

interface AuthContextProps {
  hasToken: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  changeHasToken: () => void;
  authPush: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { push } = useRouter();
  const [hasToken, setHasToken] = useState(!!userToken);
  const [isLoading, setIsLoading] = useState(false);

  const changeHasToken = () => setHasToken((hasToken) => !hasToken);

  const authPush = () => {
    if (hasToken) {
      return push(APP_ROUTES.private.dashboard.name);
    }

    return push(APP_ROUTES.public.auth);
  };

  useEffect(() => {
    if (userToken) return setHasToken(true);
  }, []);

  return (
    <AuthContext.Provider value={{ hasToken, isLoading, setIsLoading, changeHasToken, authPush }}>
      {children}
    </AuthContext.Provider>
  );
};
