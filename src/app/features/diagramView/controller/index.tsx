import { useState } from 'react';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { KeyValue } from '~types/IKeyValue';
import { DownloadModal } from '../views/DownloadModal';
import { ClearModal } from '../views/ClearModal';
import { TabsNavigationItems } from '~/src/app/shared/types/ITabsNavigationItems';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

export const useDiagramViewController = () => {
  const [idx, setIdx] = useState(0);
  const { isDisabled, setXml } = useBPMN();

  const modal: KeyValue = {
    1: DownloadModal(),
    2: ClearModal()
  };

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

  return {
    isDisabled,
    idx,
    modal,
    links,
    setXml,
    setIdx
  };
};
