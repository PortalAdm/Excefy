'use client';

import { FormEvent, ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import download from 'downloadjs';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import { useToast } from '../hooks/useToast';
import { updateProcess } from '~/src/app/features/diagramView/services';
import { AuthResponse } from '../types/responses/AuthResponse';
import { TBPMNDraft } from '../types';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';

const diagramXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0evpjna" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="15.1.3">
  <bpmn:collaboration id="Collaboration_0325o5f">
    <bpmn:participant id="Participant_1i8iha1" processRef="Process_1t7yaf6" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1t7yaf6">
    <bpmn:startEvent id="Event_06dyhzh" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0325o5f">
      <bpmndi:BPMNShape id="Participant_1i8iha1_di" bpmnElement="Participant_1i8iha1" isHorizontal="true">
        <dc:Bounds x="150" y="70" width="600" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_06dyhzh_di" bpmnElement="Event_06dyhzh">
        <dc:Bounds x="212" y="172" width="36" height="36" />
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
  getupdatedXml: (
    viewer: BpmnViewer,
    user: AuthResponse,
    updateLocalXml: (xml: string) => void
  ) => void;
  downloadSVGiagram: (viewer: BpmnViewer) => void;
  downloadBPMNDiagram: (viewer: BpmnViewer, draft: TBPMNDraft) => void;
  handleImportFile: (e: FormEvent<HTMLInputElement>) => void;
}

interface BpmnContextProviderProps {
  children: ReactNode;
}

export const BPMNFileName = 'diagram.bpmn';
export const SVGFileName = 'diagram.svg';

export const BpmnContext = createContext({} as BpmnContext);

export const BpmnContextProvider = ({ children }: BpmnContextProviderProps) => {
  const { draft } = useLocalBPMN();

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
    async (viewer: BpmnViewer, user: AuthResponse, updateLocalXml: (xml: string) => void) => {
      const { xml } = await viewer.saveXML({ format: true });
      setIsDisabled(false);

      if (xml) {
        const errorHandler = () =>
          setToast('Ocorreu um erro!', 'Suas alterações não serão salvas', 'error');
        const updateRes = await updateProcess(xml, user?.userId, user?.clientId, 0, errorHandler);
        if (updateRes) {
          updateLocalXml(xml);
          setLastUpdate(updateRes);
          return setUpdatedXml(xml);
        }
      }
    },
    [setToast]
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
    async (viewer: BpmnViewer, draft: TBPMNDraft) => {
      const { xml, error } = await viewer.saveXML({ format: true, preamble: true });

      if (error) {
        return setToast('Seu BPMN não pode ser gerado!', error.message, 'error');
      }

      if (xml) {
        setToast('BPMN gerado com sucesso!', 'Seu download está pronto', 'success');
        return download(draft?.xml, BPMNFileName, 'application/xml');
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
      if (e instanceof Error) throw new Error('Erro ao importar arquivo', e);
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
