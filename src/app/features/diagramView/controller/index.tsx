import { useState } from 'react';
import { CiExport, CiImport } from 'react-icons/ci';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { KeyValue } from '~types/IKeyValue';
import { DownloadModal } from '../views/DownloadModal';
import { TabsNavigationItems } from '~/src/app/shared/types/ITabsNavigationItems';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';

export const useDiagramViewController = (viewer: BpmnViewer) => {
  const [idx, setIdx] = useState(0);
  const { draft } = useLocalBPMN();
  const { isDisabled, handleImportFile } = useBPMN();

  const modal: KeyValue = {
    1: DownloadModal(viewer)
    // adicione o index do modal e qual deve ser renderizado
  };
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

  return {
    isDisabled,
    idx,
    modal,
    links,
    buttons,
    setIdx
  };
};
