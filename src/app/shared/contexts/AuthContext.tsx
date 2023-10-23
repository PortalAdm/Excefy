'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../utils/constants/app-routes';
import { useTimeout } from '../hooks/useTimeout';

const cookies = parseCookies();
const userToken = cookies.IALOGUE;

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
  const [hasToken, setHasToken] = useState(!!userToken);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const situation = errorMessage !== undefined;
  const updateSituation = () => setErrorMessage('');
  const time = 3000;

  const { resetSituation } = useTimeout(situation, updateSituation, time);

  useEffect(() => {
    resetSituation();
  }, [resetSituation]);

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
