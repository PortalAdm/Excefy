'use client';

import React, { useEffect, useRef } from 'react';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';

export function BpmnView({ children }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { xml, setXml } = useBPMN(); // setXml deve guardar o estado do xml criado pelo cliente ao mexer no fluxograma
  const canvaRef = useRef(null);

  useEffect(() => {
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

    viewer.on('element.changed', (e) => {
      // Obter o XML do fluxograma editado
      const element = e.element;

      // Definir o XML do fluxograma editado no estado
      // console.log(e?.gfx);
      // eslint-disable-next-line no-console
      console.log(element);
    });

    importXML(xml, viewer);
  }, [xml]);

  return (
    <div className="relative h-full border-t-[1px] border-primary" id="js-canvas" ref={canvaRef}>
      {children}
    </div>
  );
}
