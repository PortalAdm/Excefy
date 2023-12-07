import { DiagramDownload } from '~types/DiagramDownload';

interface Labels {
  label: string;
  id: string;
  value: DiagramDownload[];
}

export const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0evpjna" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="15.1.3">
  <bpmn:process id="Process_1n92nad" isExecutable="false">
    <bpmn:startEvent id="StartEvent_0qgz46d" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1n92nad">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_0qgz46d">
        <dc:Bounds x="156" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

export const labels: Labels[] = [
  // checar se isso virá da api
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
