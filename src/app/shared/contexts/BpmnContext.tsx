import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { diagramXML } from '~features/diagramView/DiagramViewUtils';

interface BpmnContext {
  xml: string;
  isDisabled: boolean;
  saveNewXml: () => void;
  setXml: Dispatch<SetStateAction<string>>;
}

interface BpmnContextProviderProps {
  children: ReactNode;
}

export const BpmnContext = createContext({} as BpmnContext);

export const BpmnContextProvider = ({ children }: BpmnContextProviderProps) => {
  const [xml, setXml] = useState(diagramXML);
  const [isDisabled, setIsDisabled] = useState(true);
  const currentXml =
    'xml que vem da api para ser comparado com o xml atual do fluxograma do cliente';

  const saveNewXml = () => {
    if (xml !== currentXml) return setIsDisabled((disabled) => !disabled);

    return setIsDisabled(true);
  };

  return (
    <BpmnContext.Provider value={{ xml, isDisabled, saveNewXml, setXml }}>
      {children}
    </BpmnContext.Provider>
  );
};
