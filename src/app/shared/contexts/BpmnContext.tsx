import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { diagramXML } from '~features/diagramView/DiagramViewUtils';
import download from 'downloadjs';

interface BpmnContext {
  xml: string | File;
  isDisabled: boolean;
  saveNewXml: () => void;
  setXml: Dispatch<SetStateAction<string | File>>;
  saveOrOpenFile: (viewer: any) => void;
}

interface BpmnContextProviderProps {
  children: ReactNode;
}

const fileName = 'diagram.bpmn';

export const BpmnContext = createContext({} as BpmnContext);

export const BpmnContextProvider = ({ children }: BpmnContextProviderProps) => {
  const [xml, setXml] = useState<string | File>(diagramXML);
  const [isDisabled, setIsDisabled] = useState(true);
  const currentXml =
    'xml que vem da api para ser comparado com o xml atual do fluxograma do cliente';

  const saveNewXml = () => {
    if (xml !== currentXml) return setIsDisabled((disabled) => !disabled);

    return setIsDisabled(true);
  };

  const downloadDiagram = async (viewer: any) => {
    try {
      viewer
        .saveXML({ format: true }, (err: string) => {
          if (err) {
            throw new Error(err);
          }
        })
        .then((res: { xml: string }) => download(res.xml, fileName, 'application/xml'));
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const saveOrOpenFile = (viewer: any) => {
    document.body.addEventListener('keydown', function (event) {
      if (event.code === 'KeyS' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();

        downloadDiagram(viewer);
      }
    });
  };

  return (
    <BpmnContext.Provider value={{ xml, isDisabled, saveNewXml, setXml, saveOrOpenFile }}>
      {children}
    </BpmnContext.Provider>
  );
};
