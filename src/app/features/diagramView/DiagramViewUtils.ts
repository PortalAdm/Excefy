import { CiExport, CiImport } from 'react-icons/ci';
import { BiTrash } from 'react-icons/bi';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export const diagramXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/BPMN/20100524/DC" xmlns:di="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" name="Process">
    <bpmn2:startEvent id="StartEvent_1" name="Start" />
    <bpmn2:userTask id="UserTask_1" name="Initialize Empty Field">
      <bpmn2:extensionElements>
        <camunda:formData>
          <camunda:formField id="emptyField" label="Empty Field" type="string" />
        </camunda:formData>
      </bpmn2:extensionElements>
    </bpmn2:userTask>
    <bpmn2:endEvent id="EndEvent_1" name="End" />
    <bpmn2:sequenceFlow id="SequenceFlow_1" sourceRef="StartEvent_1" targetRef="UserTask_1" />
    <bpmn2:sequenceFlow id="SequenceFlow_2" sourceRef="UserTask_1" targetRef="EndEvent_1" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_1_di" bpmnElement="UserTask_1">
        <dc:Bounds height="50.0" width="100.0" x="247.0" y="102.0" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="383.0" y="102.0" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1_di" bpmnElement="SequenceFlow_1">
        <di:waypoint x="209.0" y="118.0" />
        <di:waypoint x="247.0" y="118.0" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_2_di" bpmnElement="SequenceFlow_2">
        <di:waypoint x="347.0" y="118.0" />
        <di:waypoint x="383.0" y="118.0" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;

const handleExportFile = (
  e: FormEvent<HTMLInputElement>,
  setXml: Dispatch<SetStateAction<string | File>>
) => {
  const target = e.target as HTMLInputElement & {
    files: FileList;
  };

  if (typeof target.files[0] !== 'undefined') {
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
