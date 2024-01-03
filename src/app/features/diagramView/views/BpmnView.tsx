'use client';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';

// import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';

import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import customTranslate from '../customTranslate/customTranslate';
import Modeler from 'bpmn-js/lib/Modeler';
import { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDiagramViewController } from '../controller';
import { BpmnHeaderContentTv, BpmnHeaderRootTv } from '../DiagramViewTV';
import { TabsNavigation } from '~/src/app/shared/components/TabsNavigation';
import { Modal } from '~/src/app/shared/components/Modal';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { Button } from '~/src/app/shared/components/Button';
import { Icon } from '~/src/app/shared/components/Icon';

interface BpmnView {
  children: ReactNode;
}

export function BpmnView({ children }: BpmnView) {
  const [headerViewer, setHeaderViewer] = useState<Modeler>();

  const { updatedXml, isDisabled, isLoading, getupdatedXml, saveWithCTRLandS } = useBPMN();
  const { idx, modal, links, buttons, setIdx } = useDiagramViewController(headerViewer as Modeler);

  const canvaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const customTranslateModule = {
      translate: ['value', customTranslate]
    };

    const options: BaseViewerOptions & { container: HTMLDivElement } = {
      container: canvaRef?.current as HTMLDivElement,
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

    const importXML = async (xml: string | File) => {
      try {
        const { warnings } = await viewer.importXML(xml as string);

        if (warnings.length) {
          throw new Error(warnings[0]);
        }
      } catch (err: any) {
        throw new Error('Erro na renderização', err);
      }
    };

    viewer.on('element.changed', () => {
      getupdatedXml(viewer);
    });

    const getInitialXML = async () => await importXML(updatedXml);

    getInitialXML();

    if (viewer) {
      saveWithCTRLandS(viewer);
    }
  }, [updatedXml, getupdatedXml, saveWithCTRLandS]);

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
                    accept=".bpmn"
                    onChange={(e) => button.onChange?.(e)}
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
      {!isLoading ? (
        <div
          className="relative h-full border-t-[1px] border-primary z-0"
          id="js-canvas"
          ref={canvaRef}
        >
          {children}
        </div>
      ) : (
        <Icon icon={AiOutlineLoading3Quarters} className="animate-spin" />
      )}
    </>
  );
}
