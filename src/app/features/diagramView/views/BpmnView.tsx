'use client';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';

import React, { useEffect, useRef, useState } from 'react';

import { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';
import BpmnViewer from 'bpmn-js/lib/Modeler';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

import { templates } from '../.camunda/element-templates';
import { useDiagramViewController } from '../controller';
import { TabsNavigation } from '~/src/app/shared/components/TabsNavigation';
import { Modal } from '~/src/app/shared/components/Modal';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { Button } from '~/src/app/shared/components/Button';
import { Icon } from '~/src/app/shared/components/Icon';
import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { formateHour } from '~/src/app/shared/utils/dateUtils';
import { TRootComponent } from '~/src/app/shared/types';
import { CustomTranslateModule } from '../resources/plugins';
import EventDetail from '~/src/app/features/diagramView/views/components/EventDetail';
import * as tv from '../DiagramViewTV';

// import { Validator } from '@bpmn-io/json-schema-validator'; // use para validar o JSON do TEMPLATE

import { default as camundaModdleDescriptor } from 'camunda-bpmn-moddle/resources/camunda.json';
import { ProcessStateActions } from './components/ProcessStateActions';
import Canva from './components/Canva';
import { getPluginsByMethod } from '../DiagramViewUtils';

export function BpmnView({ children }: TRootComponent) {
  const { draft } = useLocalBPMN();
  const { updatedXml, isDisabled, isLoading, lastUpdate, getupdatedXml } = useBPMN();
  const [headerViewer, setHeaderViewer] = useState<BpmnViewer>();
  const {
    idx,
    modal,
    links,
    buttons,
    processState,
    changeProcessState,
    changeModalState,
    updateIdIndex,
    getInitialXML,
    updateXml
  } = useDiagramViewController(headerViewer as BpmnViewer);
  const canvaRef = useRef<HTMLDivElement>(null);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTemplates = templates.map((key) => key).flat();
    const elementTemplates = loadTemplates;

    const plugins = getPluginsByMethod(processState);

    const additionalModules = [
      ...plugins,
      CustomTranslateModule // sempre deixe-o por último
    ];

    const options: BaseViewerOptions = {
      propertiesPanel: {
        parent: propertiesPanelRef?.current
      },
      simulatePanel: {
        parent: canvaRef?.current
      },
      container: canvaRef.current as HTMLDivElement,
      keyboard: {
        bindTo: document
      },
      additionalModules,
      elementTemplates,
      taskResizingEnabled: true,
      eventResizingEnabled: true,
      exporter: {
        name: 'bpmn-js-token-simulation',
        version: '0.0.0'
      },
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    };

    const viewer = new BpmnViewer(options);

    if (!headerViewer) {
      setHeaderViewer(viewer);
    }

    updateXml(viewer, getupdatedXml);

    getInitialXML(viewer, updatedXml as string);

    return () => viewer.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processState, isLoading]);

  return (
    <section className="w-full h-full">
      <div className={tv.BpmnHeaderRootTv()}>
        <TabsNavigation.root>
          <TabsNavigation.items links={links} />
        </TabsNavigation.root>
        <ProcessStateActions changeProcessState={changeProcessState} processState={processState} />
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
            <Modal.trigger changeModalState={changeModalState} key={i}>
              <Button.root
                disabled={i !== 0 && isDisabled}
                size="small"
                color="transparent"
                variant="bordered"
                onClick={() => updateIdIndex(i)}
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
      {draft && !isLoading ? (
        <Canva className={tv.bpmnCanvasTv()} ref={canvaRef}>
          <EventDetail ref={propertiesPanelRef} />
          {children}
        </Canva>
      ) : (
        <div className={tv.BpmnContentFallbackTv()}>
          <Text text="Você deve ter criado eu estar editanto um diagrama para continuar" />
          <Icon icon={AiOutlineLoading3Quarters} className="animate-spin" />
        </div>
      )}
    </section>
  );
}
