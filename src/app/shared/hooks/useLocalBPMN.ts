import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { localStorage } from '~/src/app/shared/utils/constants/localStorage';
import { TBPMNDraft } from '~/src/app/shared/types';
import { useCallback } from 'react';

const localDraftName = localStorage.process.draft;

export const useLocalBPMN = () => {
  const { getLocalStorage, setLocalStorage, deleteFromStorage } = useLocalStorage();

  const draft: TBPMNDraft = getLocalStorage(localDraftName);

  const updateLocalXml = useCallback(
    (xml: string) => {
      setLocalStorage(localDraftName, {
        ...draft,
        xml
      });
    },
    [draft, setLocalStorage]
  );

  const updateLocalDraft = useCallback(
    (newDraft: TBPMNDraft) => {
      return setLocalStorage(localDraftName, {
        ...newDraft,
        xml: newDraft.xml
      });
    },
    [setLocalStorage]
  );

  const clearLocalDraft = useCallback(() => deleteFromStorage(localDraftName), [deleteFromStorage]);

  return {
    draft,
    updateLocalXml,
    updateLocalDraft,
    clearLocalDraft
  };
};
