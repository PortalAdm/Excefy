import { useCallback, useMemo, useState } from 'react';
import { CiExport, CiImport } from 'react-icons/ci';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { DownloadModal } from '../views/DownloadModal';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { TabsNavigationItems, KeyValue } from '~/src/app/shared/types';
import { DiagramDownload } from '~/src/app/shared/types/DiagramDownload';
import { useModal } from '~/src/app/shared/hooks/useModal';

export const useDiagramViewController = (viewer: BpmnViewer) => {
  const { draft } = useLocalBPMN();
  const { isDisabled, handleImportFile, downloadBPMNDiagram, downloadSVGiagram } = useBPMN();
  const { modalState, changeModalState } = useModal();

  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState<DiagramDownload[]>([]);

  const updateIdIndex = useCallback((idx: number) => setIdx(idx), []);

  const handleCheckboxChange = useCallback(
    (checkboxValue: DiagramDownload) => {
      const valueIndex = value.findIndex((item) => item === checkboxValue);

      if (valueIndex === -1) {
        setValue([...value, checkboxValue]);
      } else {
        const updatedValue = [...value];
        updatedValue.splice(valueIndex, 1);
        setValue(updatedValue);
      }
    },
    [value]
  );

  const handleCancelDownload = useCallback(() => {
    changeModalState();
    setValue([]);
  }, [changeModalState]);

  const downloading = useCallback(() => {
    value.forEach((value) =>
      value === 'bpmn' ? downloadBPMNDiagram(viewer) : downloadSVGiagram(viewer)
    );

    setValue([]);
    changeModalState();
  }, [changeModalState, downloadBPMNDiagram, downloadSVGiagram, value, viewer]);

  const modal: KeyValue = useMemo(
    () => ({
      1: DownloadModal(
        modalState,
        value,
        changeModalState,
        handleCheckboxChange,
        downloading,
        handleCancelDownload
      )
      // adicione o index do modal e qual deve ser renderizado
    }),
    [changeModalState, downloading, handleCancelDownload, handleCheckboxChange, modalState, value]
  );
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

  const getInitialXML = useCallback(async (viewer: BpmnViewer, xml: string) => {
    if (xml) {
      try {
        const { warnings } = await viewer.importXML(xml);

        if (warnings.length) {
          throw new Error(warnings[0]);
        }
      } catch (err: any) {
        throw new Error('Erro na renderização', err);
      }
    }
  }, []);

  const updateXml = useCallback(
    (viewer: BpmnViewer, getupdatedXml: (viewer: BpmnViewer) => void) => {
      viewer.on('element.changed', async (e) => {
        e.preventDefault();

        getupdatedXml(viewer);
      });
    },
    []
  );

  return {
    isDisabled,
    idx,
    modal,
    links,
    buttons,
    value,
    modalState,
    updateIdIndex,
    getInitialXML,
    updateXml,
    handleCancelDownload,
    downloading,
    handleCheckboxChange,
    changeModalState
  };
};
