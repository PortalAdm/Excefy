'use client';

const hasWindow = typeof window !== 'undefined';

export const useLocalStorage = () => {
  const STORAGE_KEY = 'Padm:';

  const getLocalStorage = (key: string) => {
    if (hasWindow) {
      const data = window.localStorage.getItem(`${STORAGE_KEY}${key}`);

      return JSON.parse(data!);
    }

    return null;
  };

  const setLocalStorage = (key: string, value: unknown) => {
    const data = JSON.stringify(value);

    return window.localStorage.setItem(`${STORAGE_KEY}${key}`, data);
  };

  const deleteFromStorage = (key: string) => {
    return window.localStorage.removeItem(`${STORAGE_KEY}${key}`);
  };

  return {
    getLocalStorage,
    setLocalStorage,
    deleteFromStorage,
    STORAGE_KEY
  };
};
