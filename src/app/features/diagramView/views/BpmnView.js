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
import { diagramXML } from '../DiagramViewUtils';
import { Button } from '~/src/app/shared/components/Button';
import { useDiagramViewController } from '../controller';
import { TabsNavigation } from '~/src/app/shared/components/TabsNavigation';
import { Modal } from '~/src/app/shared/components/Modal';
import { BpmnHeaderContentTv, BpmnHeaderRootTv } from '../DiagramViewTV';

export function BpmnView({ children }) {
  const [headerViewer, setHeaderViewer] = useState();

  const { initialXml, isDisabled, getupdatedXml, saveWithCTRLandS, setInitialXml } =
    useBPMN();
  const canvaRef = useRef(null);
  const { idx, modal, links, buttons, setIdx } = useDiagramViewController(headerViewer);

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

    setHeaderViewer(viewer);

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
    saveWithCTRLandS(viewer);
  }, [initialXml]);

  return (
    <>
      <div className={BpmnHeaderRootTv()}>
        <TabsNavigation.root>
          <TabsNavigation.items links={links} />
        </TabsNavigation.root>
        <div className={BpmnHeaderContentTv()}>
          {buttons.map((button, i) => (
            <Modal.trigger key={i}>
              <Button.root
                disabled={i !== 0 && isDisabled}
                size="small"
                color="transparent"
                variant="bordered"
                onClick={() => setIdx(i)}
              >
                {i === 0 && (
                  <input
                    type="file"
                    className="absolute opacity-0"
                    accept=".bpmn, svg"
                    onChange={(e) => button.onChange?.(e, setInitialXml)}
                  />
                )}
                <Button.icon icon={button.icon} />
                <Button.label color="primary" text={button.text} />
              </Button.root>
            </Modal.trigger>
          ))}
        </div>
        {modal[idx]}
      </div>
      <div
        className="relative h-full border-t-[1px] border-primary z-0"
        id="js-canvas"
        ref={canvaRef}
      >
        {children}
      </div>
    </>
  );
}
