'use client';

import { createContext, useContext } from 'react';
import { Bpmn } from '~features/diagramView';
import { KeyboardShotcut } from '~features/KeyboardShotcut';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';

const configContext = createContext(null);

export default function NewProcesspage() {
  const config = useContext(configContext);

  const viewer = new BpmnViewer({
    config,
    container: document.getElementById('js-canvas'),
    moddleExtensions: {
      camunda: camundaModdle
    }
  });

  return (
    <Bpmn.root>
      <Bpmn.header />
      <Bpmn.view viewer={viewer}>
        <KeyboardShotcut />
      </Bpmn.view>
    </Bpmn.root>
  );
}
