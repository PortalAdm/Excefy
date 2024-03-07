'use client';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';

// import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';

import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
import { ElementTemplatesPropertiesProviderModule } from 'bpmn-js-element-templates';

import BpmnViewer from 'bpmn-js/lib/Modeler';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import customTranslate from '../customTranslate/customTranslate';
import Modeler from 'bpmn-js/lib/Modeler';
import { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDiagramViewController } from '../controller';
import * as tv from '../DiagramViewTV';
import { TabsNavigation } from '~/src/app/shared/components/TabsNavigation';
import { Modal } from '~/src/app/shared/components/Modal';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { Button } from '~/src/app/shared/components/Button';
import { Icon } from '~/src/app/shared/components/Icon';
import EventDetail from '~/src/app/features/diagramView/views/EventDetail';
import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { formateHour } from '~/src/app/shared/utils/dateUtils';
import { TRootComponent } from '~/src/app/shared/types';

export function BpmnView({ children }: TRootComponent) {
  const { draft } = useLocalBPMN();
  const canvaRef = useRef<HTMLDivElement>(null);
  const [headerViewer, setHeaderViewer] = useState<Modeler>();
  const { updatedXml, isDisabled, isLoading, lastUpdate, getupdatedXml, saveWithCTRLandS } =
    useBPMN();
  const { idx, modal, links, buttons, setIdx, getInitialXML, updateXml } = useDiagramViewController(
    headerViewer as Modeler
  );
  const propertiesPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const customTranslateModule = {
      translate: ['value', customTranslate]
    };

    const options: BaseViewerOptions = {
      propertiesPanel: {
        parent: propertiesPanelRef?.current
      },
      container: canvaRef?.current as HTMLDivElement,
      keyboard: {
        bindTo: window
      },
      additionalModules: [
        customTranslateModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        ElementTemplatesPropertiesProviderModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    };

    const viewer = new BpmnViewer(options);

    if (!headerViewer) {
      setHeaderViewer(viewer);
    }

    updateXml(viewer, getupdatedXml);

    if (viewer) {
      saveWithCTRLandS(viewer);
    }

    getInitialXML(viewer, updatedXml as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={tv.BpmnHeaderRootTv()}>
        <TabsNavigation.root>
          <TabsNavigation.items links={links} />
        </TabsNavigation.root>
        <div className={tv.bpmnViewerHeaderTv()}>
          <Title title={draft?.commandName} size="md" className="truncate" />
          {lastUpdate && (
            <div className="flex gap-2 items-center">
              <Text
                text={`Salvo automaticamente ${formateHour(lastUpdate)}`}
                as="span"
                color="placeholder"
                size="sm"
              />
              <Icon icon={FaCheck} color="outline" size="small" />
            </div>
          )}
        </div>
        <div className={tv.BpmnHeaderContentTv()}>
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
      {!draft && <Text text="Você deve ter criado eu estar editanto um diagrama para continuar" />}
      {draft && !isLoading ? (
        <div className={tv.bpmnCanvasTv()} id="js-canvas" ref={canvaRef}>
          <EventDetail ref={propertiesPanelRef} />
          {children}
        </div>
      ) : (
        <Icon icon={AiOutlineLoading3Quarters} className="animate-spin" />
      )}
    </>
  );
}
