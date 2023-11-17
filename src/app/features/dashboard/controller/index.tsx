import { useCallback } from 'react';
import { usePromise } from '~/src/app/shared/hooks/usePromise';
import { getAllProcess } from '../services';

export const useDashboardController = () => {
  const getProcess = useCallback(async () => {
    return await getAllProcess();
  }, []);

  const { data } = usePromise(getProcess);

  return { data };
};
