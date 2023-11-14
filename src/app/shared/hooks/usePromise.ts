'use client';

import { useEffect, useState } from 'react';

type PromiseStatus = {
  loading: boolean;
  success: boolean;
  error: boolean;
  done: boolean;
};

export const usePromise = (promise: () => Promise<any> | null, cleanUp?: () => void) => {
  const [promiseStatus, setPromiseStatus] = useState<{ data: null } & PromiseStatus>({
    loading: false,
    error: false,
    success: false,
    done: false,
    data: null
  });

  useEffect(() => {
    setPromiseStatus((status) => ({
      ...status,
      error: false,
      loading: true
    }));

    const runPromise = async () => {
      try {
        if (promise) {
          const data = await promise();
          setPromiseStatus((status) => ({
            ...status,
            data,
            loading: false,
            success: true,
            done: true
          }));
        }
      } catch (error) {
        setPromiseStatus((status) => ({
          ...status,
          error: true,
          loading: false,
          done: true
        }));
      }
    };

    runPromise();

    return cleanUp?.();
  }, [promise, cleanUp]);

  return {
    ...promiseStatus
  };
};
