import { useCallback, useMemo, useState } from 'react';

import BpmnViewer from 'bpmn-js/lib/Modeler';

import { CiExport, CiImport } from 'react-icons/ci';

import { DownloadModal } from '../views/DownloadModal';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { KeyValue, TProcessState } from '~/src/app/shared/types';
import { DiagramDownload } from '~/src/app/shared/types/DiagramDownload';
import { useModal } from '~/src/app/shared/hooks/useModal';
import { implantBpmnIntoCamunda, runBpmnIntoCamunda } from '../services';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { getProcessKeyFromXml, parseProcessInstance } from '../DiagramViewUtils';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';
import { useToast } from '~/src/app/shared/hooks/useToast';
import { useMutation } from 'react-query';

export const useDiagramViewController = (viewer: BpmnViewer) => {
  const { changeToastActive } = useToast();
  const { draft, updateLocalXml } = useLocalBPMN();
  const { isDisabled, handleImportFile, downloadBPMNDiagram, downloadSVGiagram } = useBPMN();
  const { modalState, changeModalState } = useModal();
  const { user } = useUserInfo();

  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState<DiagramDownload[]>([]);
  const [processState, setProcessState] = useState<TProcessState>('design');

  const changeProcessState = useCallback((state: TProcessState) => setProcessState(state), []);

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
      value === 'bpmn' ? downloadBPMNDiagram(viewer, draft) : downloadSVGiagram(viewer)
    );

    setValue([]);
    changeModalState();
  }, [changeModalState, downloadBPMNDiagram, downloadSVGiagram, draft, value, viewer]);

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
      const { warnings } = await viewer.importXML(xml);

      if (warnings.length) {
        // eslint-disable-next-line no-console
        console.warn(`Possível problema na inicialização do xml inicial:`, warnings[0]);
      }
    }
  }, []);

  const updateXml = useCallback(
    (
      viewer: BpmnViewer,
      getupdatedXml: (
        viewer: BpmnViewer,
        user: AuthResponse,
        updateLocalXml: (xml: string) => void
      ) => void
    ) => {
      viewer.on('element.changed', async () => {
        getupdatedXml(viewer, user, updateLocalXml);
      });
    },
    [user, updateLocalXml]
  );

  const showToast = useCallback(
    (state: 'success' | 'error', title: string, message: string) =>
      changeToastActive(
        {
          state
        },
        title,
        message,
        5000 // 5s
      ),
    [changeToastActive]
  );

  const implant = useCallback(async () => {
    const bpmnXml = await viewer.saveXML();

    if (!bpmnXml?.xml) return;

    const deploymentName = `${draft?.commandName}-${new Date().toISOString()}`;

    const res = await implantBpmnIntoCamunda(bpmnXml.xml, deploymentName);

    const isSuccess = res === 'File(s) uploaded successfully.';
    showToast(
      isSuccess ? 'success' : 'error',
      isSuccess ? 'Sucesso' : 'Erro',
      isSuccess ? 'Processo implantado com sucesso' : `Não conseguimos implantar seu processo`
    );
  }, [draft?.commandName, showToast, viewer]);

  const run = useCallback(async () => {
    const bpmnXml = await viewer.saveXML();

    if (!bpmnXml?.xml || !user) return;

    const processKey = getProcessKeyFromXml(bpmnXml.xml);
    if (!processKey) return;

    const res = await runBpmnIntoCamunda(user.clientId, processKey);
    if (!res || !res[0]?.content) return;

    const parsedContent = parseProcessInstance(res[0].content);
    const ended = parsedContent?.ended;

    showToast(
      ended ? 'success' : 'error',
      ended ? 'Sucesso' : 'Erro',
      ended
        ? `O processo foi executado com sucesso: ${parsedContent.id}`
        : `Não conseguimos executar o processo: ${processKey}`
    );
  }, [viewer, user, showToast]);

  const { mutateAsync: runAction, isLoading: isRunLoading } = useMutation({
    mutationFn: run
  });

  const { mutateAsync: implantAction, isLoading: isImplantLoading } = useMutation({
    mutationFn: implant
  });

  return {
    isDisabled,
    idx,
    modal,
    buttons,
    value,
    modalState,
    processState,
    isRunLoading,
    isImplantLoading,
    implantAction,
    runAction,
    changeProcessState,
    updateIdIndex,
    getInitialXML,
    updateXml,
    handleCancelDownload,
    downloading,
    handleCheckboxChange,
    changeModalState
  };
};
