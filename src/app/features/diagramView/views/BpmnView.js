'use client';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';

import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';

import React, { useEffect, useRef, useState } from 'react';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';

import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import customTranslate from '../customTranslate/customTranslate';
import { BpmnHeader } from './BpmnHeader';

export function BpmnView({ children }) {
  const { initialXml, getupdatedXml, saveOrOpenFile } = useBPMN();
  const canvaRef = useRef(null);
  const [teste, setTeste] = useState();

  useEffect(() => {
    const loadTemplates = () => {
      const context = require.context('../.camunda/element-templates', false, /\.json$/);
      return context
        .keys()
        .map((key) => context(key))
        .flat();
    };

    const TEMPLATES = loadTemplates();

    const customTranslateModule = {
      translate: ['value', customTranslate]
    };

    const options = {
      container: canvaRef?.current,
      keyboard: {
        bindTo: window
      },
      additionalModules: [customTranslateModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    };

    const viewer = new BpmnViewer(options);

    setTeste(viewer);

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

    viewer.on('element.changed', () => {
      getupdatedXml(viewer);
    });

    const getXML = async () => await importXML(initialXml);

    // viewer.get('connectorsExtension').loadTemplates(TEMPLATES);

    getXML();
    saveOrOpenFile(viewer);
  }, [initialXml]);

  return (
      <>
        <BpmnHeader viewer={teste} />
        <div className="relative h-full border-t-[1px] border-primary z-0" id="js-canvas" ref={canvaRef}>
          {children}
        </div>
      </>
  );
}
