'use client';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';
import { CreateAppendAnythingModule } from 'bpmn-js-create-append-anything';
import { CloudElementTemplatesPropertiesProviderModule } from 'bpmn-js-element-templates';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
import TokenSimulationModule from 'bpmn-js-token-simulation';
import BpmnViewer from 'bpmn-js/lib/Modeler';
import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';
import AddExporterModule from '@bpmn-io/add-exporter';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import TemplateIconRendererModule from '@bpmn-io/element-templates-icons-renderer';
import ResizeTask from 'bpmn-js-task-resize/lib';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

import customTranslate from '../customTranslate/customTranslate';
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
import EventDetail from '~/src/app/features/diagramView/views/EventDetail';
import * as tv from '../DiagramViewTV';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

import { default as camundaModdleDescriptor } from 'camunda-bpmn-moddle/resources/camunda.json';

export function BpmnView({ children }: TRootComponent) {
  const { draft } = useLocalBPMN();
  const canvaRef = useRef<HTMLDivElement>(null);
  const [headerViewer, setHeaderViewer] = useState<BpmnViewer>();
  const { updatedXml, isDisabled, isLoading, lastUpdate, getupdatedXml, saveWithCTRLAndS } =
    useBPMN();
  const { idx, modal, links, buttons, changeModalState, updateIdIndex, getInitialXML, updateXml } =
    useDiagramViewController(headerViewer as BpmnViewer);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);

  const loadTemplates = useCallback(() => templates.map((key) => key).flat(), []);

  useEffect(() => {
    const CustomTranslateModule = {
      translate: ['value', customTranslate]
    };

    const elementTemplates = loadTemplates();

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
      additionalModules: [
        TokenSimulationModule,
        ConnectorsExtensionModule,
        CreateAppendAnythingModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CloudElementTemplatesPropertiesProviderModule,
        TemplateIconRendererModule,
        BpmnColorPickerModule,
        ResizeTask,
        AddExporterModule,
        CustomTranslateModule // sempre deixe-o por último
      ],
      elementTemplates,
      taskResizingEnabled: true,
      eventResizingEnabled: true,
      exporter: {
        name: 'bpmn-js-token-simulation',
        version: '0.0.0'
      },
      moddleExtensions: {
        zeebe: zeebeModdle,
        camunda: camundaModdleDescriptor
      }
    };

    const viewer = new BpmnViewer(options);

    if (!headerViewer) {
      setHeaderViewer(viewer);
    }

    updateXml(viewer, getupdatedXml);

    if (viewer) {
      saveWithCTRLAndS(viewer);
    }

    getInitialXML(viewer, updatedXml as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full h-full">
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
      {!draft && <Text text="Você deve ter criado eu estar editanto um diagrama para continuar" />}
      {draft && !isLoading ? (
        <div className={tv.bpmnCanvasTv()} id="canvas" ref={canvaRef}>
          <EventDetail ref={propertiesPanelRef} />
          <div className="properties-panel" id="properties-panel">
            <div
              className="properties-panel-resizer"
              id="properties-panel-resizer"
              title="Toggle properties panel"
              draggable="true"
            >
              <div className="properties-panel-resize-handle"></div>
            </div>
          </div>
          {children}
        </div>
      ) : (
        <Icon icon={AiOutlineLoading3Quarters} className="animate-spin" />
      )}
    </section>
  );
}
