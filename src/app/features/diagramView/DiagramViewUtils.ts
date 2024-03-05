import { DiagramDownload } from '~types/DiagramDownload';

interface Labels {
  label: string;
  id: string;
  value: DiagramDownload[];
}

export const diagramXML = `
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
