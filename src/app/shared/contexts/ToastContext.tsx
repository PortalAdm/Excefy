'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';
import { useTimeout } from '~hooks/useTimeout';
import { ToastType } from '~types/ToastType';

interface ToastContextProps {
  toastOptions: ToastType;
  changeToastActive: (
    state?: Pick<ToastType, 'state'>,
    messageTitle?: string,
    messageDescription?: string,
    time?: number
  ) => void;
}

interface ToastContextProviderProps {
  children: ReactNode;
}

const timeRef = 2500; // 2.5s

export const ToastContext = createContext({} as ToastContextProps);

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const [toastOptions, setToastOptions] = useState<ToastType>({
    isActive: false,
    state: 'success',
    messageTitle: 'Successo!',
    messageDescription: '',
    timeActive: timeRef
  });

  const updateSituation = useCallback(() => {
    setToastOptions((prevState) => ({
      ...prevState,
      isActive: false
    }));
  }, []);

  useTimeout(toastOptions.isActive, updateSituation, toastOptions.timeActive!);

  const changeToastActive = useCallback(
    (
      state?: Pick<ToastType, 'state'>,
      messageTitle?: string,
      messageDescription?: string,
      time?: number
    ) =>
      setToastOptions({
        isActive: !toastOptions.isActive,
        state: state?.state || toastOptions.state,
        messageTitle,
        messageDescription,
        timeActive: time || timeRef
      }),
    [toastOptions.isActive, toastOptions.state]
  );

  return (
    <ToastContext.Provider value={{ toastOptions, changeToastActive }}>
      {children}
    </ToastContext.Provider>
  );
};
