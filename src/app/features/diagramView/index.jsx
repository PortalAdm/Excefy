'use client';

import React, { useEffect, useRef, useState } from 'react';
import { diagramXML } from './DiagramViewUtils';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

export function BpmnView() {
  const [diagram, setDiagram] = useState(diagramXML); // setState será usado para, por exemplo, carregar um diagrama do cliente
  const canvaRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const viewer = new BpmnViewer({
        container: document.getElementById('js-canvas'),
        keyboard: {
          bindTo: window
        },
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      });

      const importXML = (xml, Viewer) => {
        Viewer.importXML(xml, (err) => {
          if (err) {
            // eslint-disable-next-line no-console
            return console.error('could not import BPMN 2.0 diagram', err);
          }
        });
      };

      importXML(diagram, viewer);
    }
  }, [diagram]);

  return <div className="w-full h-screen" id="js-canvas" ref={canvaRef} />;
}
