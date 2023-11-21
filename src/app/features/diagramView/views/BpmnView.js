'use client';

import React, { useEffect, useRef } from 'react';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';

export function BpmnView({ children, viewer }) {
  const { xml, setXml } = useBPMN();
  const canvaRef = useRef(null);

  useEffect(() => {


    const importXML = async (xml, Viewer) => {
      await Viewer.importXML(xml, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          return console.error('could not import BPMN 2.0 diagram', err);
        }
      });
    };

    viewer.on('element.changed', (e) => {
      const element = e.element;

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
