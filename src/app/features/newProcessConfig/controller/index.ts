import { TabsNavigationItems } from '~types/ITabsNavigationItems';
import { APP_ROUTES } from '~utils/constants/app-routes';
import { updateProcessConfiguration } from '../services';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/src/app/shared/hooks/useDebounce';
import { useToast } from '~/src/app/shared/hooks/useToast';

const delayToAutomaticSave = 1000; // 1 segundo após a ultima ação no input
const delayToRemoveToast = 5000; // 5 segundos

export const useNewProcessConfigController = () => {
  const { changeToastActive } = useToast();
  const { debounced } = useDebounce();

  const [processName, setProcessName] = useState('');
  const [processDescription, setProcessDescription] = useState('');

  const links: TabsNavigationItems[] = [
    {
      href: APP_ROUTES.private['new-process'].name,
      label: APP_ROUTES.private['new-process'].label
    },
    {
      href: APP_ROUTES.private['new-process-config'].name,
      label: APP_ROUTES.private['new-process-config'].label
    }
  ];

  useEffect(() => {
    const getFormData = async () => {
      if (processName || processDescription) {
        return await updateProcessConfiguration({ processDescription, processName }).then((res) => {
          if (res?.[0].content.includes('Base de dados atualizada com sucesso!')) {
            return changeToastActive(
              { state: 'success' },
              'Seu processo foi criado com sucesso! ',
              '',
              5000
            );
          }

          return changeToastActive({ state: 'error' }, res?.[0].content, '', delayToRemoveToast);
        });
      }
      return;
    };

    if (processName || processDescription) {
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
