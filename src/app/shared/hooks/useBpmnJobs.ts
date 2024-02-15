import { useCallback } from 'react';
import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';

export const useBpmnJobs = () => {
  const { setLocalStorage, getLocalStorage } = useLocalStorage();

  const localStorageProcessName = 'process';

  const updateLocal = useCallback(
    (xml: string) => {
      setLocalStorage(localStorageProcessName, xml);
    },
    [setLocalStorage]
  );

  const getLocal = useCallback(() => {
    const storedXml = getLocalStorage(localStorageProcessName);

    return storedXml || null;
  }, [getLocalStorage]);

  return {
    updateLocal,
    getLocal
  };
};
