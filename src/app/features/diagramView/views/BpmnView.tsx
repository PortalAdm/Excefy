'use client';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
import '@bpmn-io/element-template-chooser/dist/element-template-chooser.css';

import React, { useEffect, useRef, useState } from 'react';

import { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';
import BpmnViewer from 'bpmn-js/lib/Modeler';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

import { templates } from '../.camunda/element-templates';
import { useDiagramViewController } from '../controller';
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
import { HeaderActions } from './components/HeaderActions';
import { Tooltip } from '~/src/app/shared/components/Tooltip';
import { updateXMLForAction } from '../resources/googleDriverValidation';

export function BpmnView({ children }: TRootComponent) {
  const { draft } = useLocalBPMN();
  const { updatedXml, isDisabled, isLoading, lastUpdate, getupdatedXml } = useBPMN();
  const [headerViewer, setHeaderViewer] = useState<BpmnViewer>();
  const {
    idx,
    modal,
    buttons,
    processState,
    isRunLoading,
    isImplantLoading,
    implantAction,
    runAction,
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

  useEffect(() => {
    const propertiesPanel = propertiesPanelRef.current;

    if (!propertiesPanel || !updatedXml || processState !== 'implementation') return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const customInputs = propertiesPanel.querySelectorAll<HTMLElement>(
            '[data-entry-id^="custom-entry-google-drive-connector"]'
          );

          if (customInputs.length > 0) {
            customInputs.forEach((customInput) => {
              const selectElement = customInput.querySelector<HTMLSelectElement>('select');

              if (selectElement) {
                const selectedValue = selectElement.value;

                selectedValue !== '' &&
                  updateXMLForAction(customInputs, selectedValue, String(updatedXml));
              }
            });
          }
        }
      }
    });

    observer.observe(propertiesPanel, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [updatedXml, processState, headerViewer, updateXml, getupdatedXml]);

  return (
    <section className="w-full h-full">
      <div className={tv.BpmnHeaderRootTv()}>
        <div>
          <div className="flex flex-shrink-0 items-center justify-between pb-4">
            <ProcessStateActions
              changeProcessState={changeProcessState}
              processState={processState}
            />
            <HeaderActions
              implantDisabled={isImplantLoading}
              runDisabled={isRunLoading}
              implantAction={implantAction}
              runAction={runAction}
            />
            <div className={tv.BpmnHeaderContentTv()}>
              {buttons.map((button, i) => (
                <Modal.trigger changeModalState={changeModalState} key={i}>
                  <Tooltip text={button.text}>
                    <Button.root
                      disabled={i !== 0 && isDisabled}
                      size="small"
                      color="transparent"
                      variant="onlyIcon"
                      onClick={() => updateIdIndex(i)}
                    >
                      {i === 0 && (
                        <input
                          type="file"
                          className="absolute opacity-0 cursor-pointer"
                          accept=".bpmn"
                          onChange={(e) => button.onChange?.(e)}
                        />
                      )}
                      <Button.icon icon={button.icon} />
                    </Button.root>
                  </Tooltip>
                </Modal.trigger>
              ))}
            </div>
          </div>

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
