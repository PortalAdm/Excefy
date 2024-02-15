import BpmnViewer from 'bpmn-js/lib/Modeler';
import { BaseViewerOptions } from 'bpmn-js/lib/BaseViewer';
import customTranslate from '~/src/app/features/diagramView/customTranslate/customTranslate';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
import { ElementTemplatesPropertiesProviderModule } from 'bpmn-js-element-templates';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

export const useViewer = (
  canvaRef: React.RefObject<HTMLDivElement>,
  propertiesPanelRef: React.RefObject<HTMLDivElement>
) => {
  const customTranslateModule = {
    translate: ['value', customTranslate]
  };

  const options: BaseViewerOptions & { container: HTMLDivElement } = {
    container: canvaRef?.current as HTMLDivElement,
    propertiesPanel: {
      parent: propertiesPanelRef?.current
    },
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

  return {
    viewer
  };
};
