'use client';

export const useLocalStorage = () => {
  const STORAGE_KEY = 'Padm:';

  const hasWindow = typeof window !== 'undefined';

  const getLocalStorage = (key: string) => {
    if (hasWindow) {
      const data = window.localStorage.getItem(`${STORAGE_KEY}${key}`);

      return JSON.parse(data!);
    }
  };

  const setLocalStorage = (key: string, value: unknown) => {
    if (hasWindow) {
      const data = JSON.stringify(value);

      return window.localStorage.setItem(`${STORAGE_KEY}${key}`, data);
    }
  };

  const deleteFromStorage = (key: string) => {
    if (hasWindow) {
      return window.localStorage.removeItem(`${STORAGE_KEY}${key}`);
    }
  };

  return {
    getLocalStorage,
    setLocalStorage,
    deleteFromStorage,
    STORAGE_KEY
  };
};
