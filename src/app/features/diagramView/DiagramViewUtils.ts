import { DiagramDownload } from '~types/DiagramDownload';
import { TKeyboardShotcutInfo } from '~types/TKeyboardShotcutInfo';
import { TProcessState } from '../../shared/types';
import { DesignPlugins, ImplementationPlugins, PluginsUsedInAll } from './resources/plugins';

interface Labels {
  label: string;
  id: string;
  value: DiagramDownload[];
}

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
    shotcutName: 'Baixar diagrama BPMN 2.0',
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
