'use client';

import { FormEvent, ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import download from 'downloadjs';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import { useToast } from '../hooks/useToast';
import { updateProcess } from '~/src/app/features/diagramView/services';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';

export const diagramXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_0evpjna" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js-token-simulation" exporterVersion="0.0.0">
  <bpmn:process id="Process_0bicilt" isExecutable="true" camunda:historyTimeToLive="P180D">
    <bpmn:startEvent id="Event_05yoi5y" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0bicilt">
      <bpmndi:BPMNShape id="Event_05yoi5y_di" bpmnElement="Event_05yoi5y">
        <dc:Bounds x="152" y="192" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

interface BpmnContext {
  updatedXml: string | File;
  isDisabled: boolean;
  isLoading: boolean;
  lastUpdate: string;
  getupdatedXml: (viewer: BpmnViewer) => void;
  downloadSVGiagram: (viewer: BpmnViewer) => void;
  downloadBPMNDiagram: (viewer: BpmnViewer) => void;
  handleImportFile: (e: FormEvent<HTMLInputElement>) => void;
}

interface BpmnContextProviderProps {
  children: ReactNode;
}

const BPMNFileName = 'diagram.bpmn';
const SVGFileName = 'diagram.svg';

export const BpmnContext = createContext({} as BpmnContext);

export const BpmnContextProvider = ({ children }: BpmnContextProviderProps) => {
  const { draft, updateLocalXml } = useLocalBPMN();
  const { user } = useUserInfo();

  const { changeToastActive } = useToast();
  const [updatedXml, setUpdatedXml] = useState<string | File>(draft?.xml || diagramXML);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');

  const setToast = useCallback(
    (messageTitle: string, messageDescription: string, state: 'success' | 'error') => {
      changeToastActive({ state: state }, messageTitle, messageDescription, 5000);
    },
    [changeToastActive]
  );

  useEffect(() => {
    if (updatedXml === diagramXML) {
      return setIsDisabled(false);
    }

    return setIsDisabled(false);
  }, [updatedXml]);

  const getupdatedXml = useCallback(
    async (viewer: BpmnViewer) => {
      const { xml } = await viewer.saveXML({ format: true });
      setIsDisabled(false);

      if (xml) {
        const errorHandler = () =>
          setToast('Ocorreu um erro!', 'Suas alterações não serão salvas', 'error');
        const updateRes = await updateProcess(
          xml,
          user?.userId,
          user?.clientId,
          draft?.commandId,
          errorHandler
        );

        if (updateRes) {
          updateLocalXml(xml);
          setLastUpdate(updateRes);
          return setUpdatedXml(xml);
        }
      }
    },
    [draft?.commandId, setToast, updateLocalXml, user?.clientId, user?.userId]
  );

  const downloadSVGiagram = useCallback(
    async (viewer: BpmnViewer) => {
      const { svg } = (await viewer.saveSVG()) || {};

      if (svg) {
        setToast('SVG gerado com sucesso!', 'Seu download está pronto', 'success');
        return download(svg, SVGFileName, 'application/xml');
      }

      return setToast('Seu SVG não pôde ser gerado!', 'Ocorreu uma falha no seu download', 'error');
    },
    [setToast]
  );

  const downloadBPMNDiagram = useCallback(
    async (viewer: BpmnViewer) => {
      const { xml, error } = await viewer.saveXML({ format: true, preamble: true });

      if (error) {
        return setToast('Seu BPMN não pode ser gerado!', error.message, 'error');
      }

      if (xml) {
        setToast('BPMN gerado com sucesso!', 'Seu download está pronto', 'success');
        return download(xml, BPMNFileName, 'application/xml');
      }
    },
    [setToast]
  );

  const handleImportFile = async (e: FormEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement & {
        files: FileList;
      };

      if (typeof target.files[0] !== 'undefined') {
        setIsLoading(true);
        const file = target.files[0];

        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target) {
            let fileContent: string;
            if (file.type === 'image/svg+xml') {
              const parser = new DOMParser();
              const svgDoc = parser.parseFromString(event.target.result as string, 'image/svg+xml');
              fileContent = svgDoc.documentElement.outerHTML;
            } else {
              fileContent = event.target.result as string;
            }

            setUpdatedXml(fileContent);
            setIsLoading(false);
            setIsDisabled(false);
          }
        };

        reader.readAsText(file);
      }
    } catch (e: any) {
      throw new Error('Erro ao importar arquivo', e);
    }
  };

  return (
    <BpmnContext.Provider
      value={{
        updatedXml,
        isLoading,
        isDisabled,
        lastUpdate,
        getupdatedXml,
        downloadSVGiagram,
        downloadBPMNDiagram,
        handleImportFile
      }}
    >
      {children}
    </BpmnContext.Provider>
  );
};
