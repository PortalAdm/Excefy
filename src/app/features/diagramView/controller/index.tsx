import { useEffect, useState } from 'react';
import { CiExport, CiImport } from 'react-icons/ci';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { KeyValue } from '~types/IKeyValue';
import { DownloadModal } from '../views/DownloadModal';
import { TabsNavigationItems } from '~/src/app/shared/types/ITabsNavigationItems';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { usePathname } from 'next/navigation';
import BpmnViewer from 'bpmn-js/lib/Modeler';

export const useDiagramViewController = (viewer: BpmnViewer) => {
  const [idx, setIdx] = useState(0);
  const { isDisabled, handleImportFile } = useBPMN();

  const pathName = usePathname();

  const modal: KeyValue = {
    1: DownloadModal(viewer)
    // adicione o index do modal e qual deve ser renderizado
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

  const buttons = [
    {
      icon: CiExport,
      text: 'Importar',
      onChange: handleImportFile
    },
    {
      icon: CiImport,
      text: 'Baixar'
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
    buttons,
    setIdx
  };
};
