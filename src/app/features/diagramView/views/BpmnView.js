'use client';

import React, { useEffect, useRef } from 'react';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import customTranslate from '../customTranslate/customTranslate';

export function BpmnView({ children }) {
  const { xml, setXml } = useBPMN();
  const canvaRef = useRef(null);

  useEffect(() => {
    const customTranslateModule = {
      translate: [ 'value', customTranslate ]
    };

    const options = {
      container: canvaRef?.current,
      keyboard: {
        bindTo: window
      },
      additionalModules: [
        customTranslateModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    };

    const viewer = new BpmnViewer(options);

    const importXML = async (xml, Viewer) => {
      await Viewer.importXML(xml, (err) => {
        if (err) {
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
