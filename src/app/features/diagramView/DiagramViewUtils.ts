import { DiagramDownload } from '~types/DiagramDownload';
import { TKeyboardShotcutInfo } from '~types/TKeyboardShotcutInfo';
import { TProcessInstance, TProcessState } from '../../shared/types';
import { DesignPlugins, ImplementationPlugins, PluginsUsedInAll } from './resources/plugins';

interface Labels {
  label: string;
  id: string;
  value: DiagramDownload[];
}

export const diagramXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_0evpjna" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js-token-simulation" exporterVersion="0.0.0">
  <bpmn:process id="Process_0omijcm" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0omijcm" />
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

export const labels: Labels[] = [
  {
    label: 'BPMN 2.0 file',
    id: 'C1',
    value: ['bpmn']
  },
  {
    label: 'SVG imagem',
    id: 'C2',
    value: ['svg']
  }
];

export const infos: TKeyboardShotcutInfo[] = [
  {
    shotcutName: 'Abrir um diagrama de arquivo local',
    shotcut: 'ctrl + O'
  },
  {
    shotcutName: 'Exportar diagrama BPMN 2.0',
    shotcut: 'ctrl + S'
  },
  {
    shotcutName: 'Desfazer',
    shotcut: 'ctrl + Z'
  },
  {
    shotcutName: 'Refazer',
    shotcut: 'ctrl + Y'
  },
  {
    shotcutName: 'Selecionar tudo',
    shotcut: 'ctrl + A'
  },
  {
    shotcutName: 'Deletar selecionados',
    shotcut: 'Del'
  },
  {
    shotcutName: 'Aumentar Zoom',
    shotcut: 'ctrl + scroll para cima'
  },
  {
    shotcutName: 'Diminuir Zoom',
    shotcut: 'ctrl + scroll para baixo'
  },
  {
    shotcutName: 'Edição direta',
    shotcut: 'E'
  },
  {
    shotcutName: 'Ferramenta de mão',
    shotcut: 'H'
  },
  {
    shotcutName: 'Ferramenta de seleção',
    shotcut: 'L'
  },
  {
    shotcutName: 'Ferramenta espacial',
    shotcut: 'S'
  }
];

export const getPluginsByMethod = (method: TProcessState) => {
  switch (method) {
    case 'design':
      return [...DesignPlugins, ...PluginsUsedInAll];
    case 'implementation':
      return [...PluginsUsedInAll, ...ImplementationPlugins];
    default:
      return [PluginsUsedInAll];
  }
};

export const getProcessKeyFromXml = (bpmnXml: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(bpmnXml, 'application/xml');
  const processElement = xmlDoc.getElementsByTagName('bpmn:process')[0];

  if (processElement && processElement.hasAttribute('id')) {
    return processElement.getAttribute('id');
  }

  return null;
};

export const parseProcessInstance = (content: string): TProcessInstance => JSON.parse(content);
