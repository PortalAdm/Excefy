'use client';

import React, { useEffect, useRef } from 'react';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';
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
      config: {
        container: document.getElementById('js-canvas')
      },
      container: document.getElementById('js-canvas'),
      keyboard: {
        bindTo: window
      },
      moddleExtensions: {
        camunda: camundaModdle
      }
    });

    const importXML = async (xml, Viewer) => {
      await Viewer.importXML(xml, (err) => {
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

    const getXML = async () => await importXML(xml, viewer);

    getXML();
  }, [xml]);

  return (
    <div className="relative h-full border-t-[1px] border-primary" id="js-canvas" ref={canvaRef}>
      {children}
    </div>
  );
}
