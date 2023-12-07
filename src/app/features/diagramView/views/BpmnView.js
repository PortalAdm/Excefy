'use client';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';

import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';

import React, { useEffect, useRef } from 'react';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';

import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import customTranslate from '../customTranslate/customTranslate';

export function BpmnView({ children }) {
  const { xml, setXml, saveOrOpenFile } = useBPMN();
  const canvaRef = useRef(null);

  useEffect(() => {
    function loadTemplates() {
      const context = require.context('../.camunda/element-templates', false, /\.json$/);
      return context.keys().map(key => context(key)).flat();
    }

    const TEMPLATES = loadTemplates();

    const customTranslateModule = {
      translate: ['value', customTranslate]
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
        camunda: camundaModdleDescriptor
      }
    };

    const viewer = new BpmnViewer(options);

    const importXML = async (xml) => {
      try {
        const { warnings } = await viewer.importXML(xml);

        if (warnings.length) {
          console.log(warnings);
        }
      } catch (err) {
        console.log('error rendering', err);
      }
    };

    const getupdatedXml = async () => {
        const { xml } = await viewer.saveXML({ format: true })

        if (xml) {
          console.log(xml)
        }
    }

    viewer.on('element.changed', (e) => {
      getupdatedXml()
    });

    const getXML = async () => await importXML(xml);

    // viewer.get('connectorsExtension').loadTemplates(TEMPLATES);

    getXML();
    saveOrOpenFile(viewer)
  }, [xml]);

  return (
    <div className="relative h-full border-t-[1px] border-primary" id="js-canvas" ref={canvaRef}>
      {children}
    </div>
  );
}
