'use client';

export const useLocalStorage = () => {
  const STORAGE_KEY = 'Padm:';

  const getLocalStorage = (key: string) => {
    const data = window.localStorage.getItem(`${STORAGE_KEY}${key}`);

    return JSON.parse(data!);
  };

  const setLocalStorage = (key: string, value: unknown) => {
    const data = JSON.stringify(value);

    return window.localStorage.setItem(`${STORAGE_KEY}${key}`, data);
  };

  return {
    getLocalStorage,
    setLocalStorage,
    STORAGE_KEY
  };
};
