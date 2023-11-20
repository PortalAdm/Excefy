import { CiExport, CiImport } from 'react-icons/ci';
import { BiTrash } from 'react-icons/bi';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export const diagramXML = '';

const handleExportFile = async (
  e: FormEvent<HTMLInputElement>,
  setXml: Dispatch<SetStateAction<string | File>>
) => {
  const target = e.target as HTMLInputElement & {
    files: FileList;
  };

  if (typeof target.files[0] !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log(target.files[0]);

    return setXml(target.files[0]); // isso deve ir para o backend para ser validado
  }
};

export const buttons = [
  {
    icon: CiExport,
    text: 'Importar',
    onChange: handleExportFile
  },
  {
    icon: CiImport,
    text: 'Baixar'
  },
  {
    icon: BiTrash,
    text: 'Limpar'
  }
];

export const labels = [
  // checar se isso virá da api
  {
    label: 'BPMN 2.0 file',
    id: 'C1',
    value: 'bpmn'
  },
  {
    label: 'SVG imagem',
    id: 'C2',
    value: 'svg'
  }
];
