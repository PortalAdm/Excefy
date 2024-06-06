import { CreateAppendAnythingModule } from 'bpmn-js-create-append-anything';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
import { CloudElementTemplatesPropertiesProviderModule } from 'bpmn-js-element-templates';

import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';
import TokenSimulationModule from 'bpmn-js-token-simulation';
import AddExporterModule from '@bpmn-io/add-exporter';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import TemplateIconRendererModule from '@bpmn-io/element-templates-icons-renderer';
import ResizeTask from 'bpmn-js-task-resize/lib';

import customTranslate from '../customTranslate/customTranslate';

// usado para adicionar plugins usados em todos os modos (geralmente provedores)
export const PluginsUsedInAll = [
  CreateAppendAnythingModule,
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  TemplateIconRendererModule,
  BpmnColorPickerModule,
  ResizeTask,
  AddExporterModule
];

// usado para adicionar plugins específicos do modo de design
export const DesignPlugins = [TokenSimulationModule];

// usado para adicionar plugins específicos do modo de implementação
export const ImplementationPlugins = [
  ConnectorsExtensionModule,
  CloudElementTemplatesPropertiesProviderModule
];

export const CustomTranslateModule = {
  translate: ['value', customTranslate]
};
