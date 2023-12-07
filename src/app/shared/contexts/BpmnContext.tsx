import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { diagramXML } from '~features/diagramView/DiagramViewUtils';
import download from 'downloadjs';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import { useToast } from '../hooks/useToast';

interface BpmnContext {
  initialXml: string | File;
  isDisabled: boolean;
  saveNewXml: () => void;
  setInitialXml: Dispatch<SetStateAction<string | File>>;
  saveOrOpenFile: (viewer: BpmnViewer) => void;
  getupdatedXml: (viewer: BpmnViewer) => void;
  downloadSVGiagram: (viewer: BpmnViewer) => void;
  downloadBPMNDiagram: (viewer: BpmnViewer) => void;
}

interface BpmnContextProviderProps {
  children: ReactNode;
}

const BPMNFileName = 'diagram.bpmn';
const SVGFileName = 'diagram.svg';

export const BpmnContext = createContext({} as BpmnContext);

export const BpmnContextProvider = ({ children }: BpmnContextProviderProps) => {
  const { changeToastActive } = useToast();
  const [initialXml, setInitialXml] = useState<string | File>(diagramXML);
  const [isDisabled, setIsDisabled] = useState(true);

  const setToast = (
    messageTitle: string,
    messageDescription: string,
    state: 'success' | 'error'
  ) => {
    changeToastActive({ state: state }, messageTitle, messageDescription, 5000);
  };

  const saveNewXml = () => {
    return setIsDisabled(true);
  };

  const getupdatedXml = async (viewer: BpmnViewer) => {
    const { xml } = await viewer.saveXML({ format: true });
    if (initialXml !== xml) return setIsDisabled(false);

    if (xml) {
      setInitialXml(xml);
      // console.log(xml);
    }
  };

  const downloadSVGiagram = async (viewer: BpmnViewer) => {
    const { svg } = await viewer.saveSVG();

    if (svg) {
      setToast('SVG gerado com sucesso!', 'Seu download está pronto', 'success');
      return download(svg, SVGFileName, 'application/xml');
    }

    return setToast('Seu SVG não pôde ser gerado!', 'Ocorreu uma falha no seu download', 'error');
  };

  const downloadBPMNDiagram = async (viewer: BpmnViewer) => {
    const { xml, error } = await viewer.saveXML({ format: true });

    console.log(error);

    if (error) {
      return setToast('Seu BPMN não pode ser gerado!', error.message, 'error');
    }

    if (xml) {
      console.log(xml);
      setToast('BPMN gerado com sucesso!', 'Seu download está pronto', 'success');
      return download(xml, BPMNFileName, 'application/xml');
    }
  };

  const saveOrOpenFile = (viewer: any) => {
    document.body.addEventListener('keydown', function (e) {
      if (e.code === 'KeyS' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        downloadSVGiagram(viewer);
      }
    });
  };

  return (
    <BpmnContext.Provider
      value={{
        initialXml,
        isDisabled,
        saveNewXml,
        setInitialXml,
        saveOrOpenFile,
        getupdatedXml,
        downloadSVGiagram,
        downloadBPMNDiagram
      }}
    >
      {children}
    </BpmnContext.Provider>
  );
};
