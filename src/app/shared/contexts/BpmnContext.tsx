import { FormEvent, ReactNode, createContext, useCallback, useState } from 'react';
import download from 'downloadjs';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import { useToast } from '../hooks/useToast';
import { diagramXML } from '~features/diagramView/DiagramViewUtils';

interface BpmnContext {
  updatedXml: string | File;
  isDisabled: boolean;
  isLoading: boolean;
  saveWithCTRLandS: (viewer: BpmnViewer) => void;
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
  const { changeToastActive } = useToast();
  const [updatedXml, setUpdatedXml] = useState<string | File>(diagramXML);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const setToast = useCallback(
    (messageTitle: string, messageDescription: string, state: 'success' | 'error') => {
      changeToastActive({ state: state }, messageTitle, messageDescription, 5000);
    },
    [changeToastActive]
  );

  const getupdatedXml = useCallback(async (viewer: BpmnViewer) => {
    const { xml } = await viewer.saveXML({ format: true });
    if (diagramXML !== xml) setIsDisabled(false);
    if (diagramXML === xml) setIsDisabled(true);

    if (xml) {
      return setUpdatedXml(xml);
    }
  }, []);

  const downloadSVGiagram = useCallback(
    async (viewer: BpmnViewer) => {
      const { svg } = await viewer.saveSVG();

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
      const { xml, error } = await viewer.saveXML({ format: true });

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

  const saveWithCTRLandS = useCallback(
    (viewer: BpmnViewer) => {
      document.body.addEventListener('keydown', (e) => {
        if (e.code === 'KeyS' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();

          downloadBPMNDiagram(viewer);
        }
      });
    },
    [downloadBPMNDiagram]
  );

  const handleImportFile = async (e: FormEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const target = e.target as HTMLInputElement & {
        files: FileList;
      };

      if (typeof target.files[0] !== 'undefined') {
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
        isDisabled,
        isLoading,
        saveWithCTRLandS,
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
