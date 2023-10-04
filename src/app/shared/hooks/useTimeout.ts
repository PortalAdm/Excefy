import { useCallback, useEffect } from 'react';

export const useTimeout = (situation: boolean, updateSituation: () => void, time: number) => {
  const resetSituation = useCallback(() => {
    if (situation) {
      const timeRef = () =>
        setTimeout(() => {
          updateSituation();
        }, time);

      timeRef();

      return clearTimeout(timeRef());
    }
  }, [situation, time, updateSituation]);

  useEffect(() => {
    resetSituation();
  }, [resetSituation]);

  return { resetSituation };
};
