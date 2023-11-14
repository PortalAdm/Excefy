'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter, usePathname } from 'next/navigation';
import { APP_ROUTES } from '../utils/constants/app-routes';
import { useTimeout } from '../hooks/useTimeout';

const cookies = parseCookies();
const session = cookies.IALOGUE;

interface AuthContextProps {
  hasToken: boolean;
  isLoading: boolean;
  errorMessage: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  changeHasToken: () => void;
  authPush: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { push } = useRouter();
  const [hasToken, setHasToken] = useState(!!session);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pathName = usePathname();
  const situation = errorMessage !== undefined;
  const time = 3000;
  const updateSituation = () => setErrorMessage('');

  const { resetSituation } = useTimeout(situation, updateSituation, time);

  useEffect(() => {
    resetSituation();
  }, [resetSituation]);

  const changeHasToken = () => setHasToken((hasToken) => !hasToken);
  const dashboard = APP_ROUTES.private.dashboard.name;

  const authPush = () => {
    if (hasToken && pathName !== dashboard) {
      return push(dashboard);
    }

    return push(APP_ROUTES.public.auth);
  };

  useEffect(() => {
    if (session) return setHasToken(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        hasToken,
        isLoading,
        errorMessage,
        setErrorMessage,
        setIsLoading,
        changeHasToken,
        authPush
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
