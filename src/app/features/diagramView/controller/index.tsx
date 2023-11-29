import { useEffect, useState } from 'react';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { KeyValue } from '~types/IKeyValue';
import { DownloadModal } from '../views/DownloadModal';
import { ClearModal } from '../views/ClearModal';
import { TabsNavigationItems } from '~/src/app/shared/types/ITabsNavigationItems';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { usePathname } from 'next/navigation';

export const useDiagramViewController = () => {
  const [idx, setIdx] = useState(0);
  const { isDisabled, setXml } = useBPMN();

  const pathName = usePathname();

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

  useEffect(() => {
    if (pathName === APP_ROUTES.private['new-process'].name) {
      return console.log('chequei o diagrama no banco');
    }
  }, [pathName]);

  return {
    isDisabled,
    idx,
    modal,
    links,
    setXml,
    setIdx
  };
};
