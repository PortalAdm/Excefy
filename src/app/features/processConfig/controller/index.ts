import { TabsNavigationItems } from '~types/ITabsNavigationItems';
import { APP_ROUTES } from '~utils/constants/app-routes';
import { updateProcessConfiguration } from '../services';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '~/src/app/shared/hooks/useDebounce';
import { useToast } from '~/src/app/shared/hooks/useToast';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { TUpdateProcessConfigurationRequest } from '~/src/app/shared/types';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { ProcessResponse } from '~/src/app/shared/types/responses/ProcessResponse';

const delayToAutomaticSave = 1000; // 1 segundo após a ultima ação no input
const delayToRemoveToast = 5000; // 5 segundos

export const useNewProcessConfigController = () => {
  const { draft, updateLocalDraft } = useLocalBPMN();
  const { user } = useUserInfo();
  const { changeToastActive } = useToast();
  const { debounced } = useDebounce();

  const [processName, setProcessName] = useState(draft?.commandName);
  const [processDescription, setProcessDescription] = useState(draft?.processDescription ?? '');

  const processRoute = draft?.isEdditing ? 'edit-process' : 'new-process';

  const links: TabsNavigationItems[] = [
    {
      href: draft?.isEdditing
        ? `${APP_ROUTES.private['edit-process'].name}${draft?.commandId}`
        : APP_ROUTES.private['new-process'].name,
      label: APP_ROUTES.private[processRoute].label
    },
    {
      href: APP_ROUTES.private['process-config'].name,
      label: APP_ROUTES.private['process-config'].label
    }
  ];

  const updateProcessConfigCallback = useCallback(
    (situation: boolean) => {
      if (situation) {
        updateLocalDraft({
          ...draft,
          commandName: processName,
          processDescription
        });

        return changeToastActive(
          { state: 'success' },
          'Processo atualizado com sucesso! ',
          '',
          5000
        );
      }

      return changeToastActive(
        { state: 'error' },
        'Encontramos um erro!',
        'Suas alterações não serão salvas.',
        delayToRemoveToast
      );
    },
    [changeToastActive, draft, processDescription, processName, updateLocalDraft]
  );

  const getFormData = useCallback(async (): Promise<ProcessResponse[] | void> => {
    if (processName || processDescription) {
      const updateConfig: TUpdateProcessConfigurationRequest = {
        processDescription,
        processName,
        commandId: draft?.commandId,
        clientId: user?.clientId,
        userId: user?.userId,
        lastEdited: new Date().toISOString(),
        createdAt: draft?.createdAt || ''
      };

      const res = await updateProcessConfiguration(updateConfig);

      if (res) {
        const situation = res?.[0].content.includes('Base de dados atualizada com sucesso!');
        updateProcessConfigCallback(situation || false);
        return res;
      }
    }
    return;
  }, [
    draft?.commandId,
    draft?.createdAt,
    processDescription,
    processName,
    updateProcessConfigCallback,
    user?.clientId,
    user?.userId
  ]);

  useEffect(() => {
    if (draft?.commandName !== processName || draft?.processDescription !== processDescription) {
      return debounced(() => getFormData(), delayToAutomaticSave);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processDescription, processName]);

  return {
    links,
    processName,
    processDescription,
    setProcessName,
    setProcessDescription
  };
};
