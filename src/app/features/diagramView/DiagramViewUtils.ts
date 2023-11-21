import { CiExport, CiImport } from 'react-icons/ci';
import { BiTrash } from 'react-icons/bi';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>' +
'<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                  'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                  'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                  'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                  'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                  'id="Definitions_1">' +
  '<bpmn:process id="Process_1" isExecutable="false">' +
    '<bpmn:startEvent id="StartEvent_1"/>' +
  '</bpmn:process>' +
  '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
    '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
      '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
        '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
      '</bpmndi:BPMNShape>' +
    '</bpmndi:BPMNPlane>' +
  '</bpmndi:BPMNDiagram>' +
'</bpmn:definitions>`;

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
