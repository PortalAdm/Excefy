import { useRef } from 'react';

/**
 * @function fn callback function
 * @param delay number
 */

export const useDebounce = () => {
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = (fn: () => void, delay: number) => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    timeOutRef.current = setTimeout(() => {
      fn();
    }, delay);
  };

  return { debounced };
};
