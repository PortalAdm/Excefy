/**
 * NOTE: This is specifically a registration of a **bpmn-js** extension. If you would like to create another type of plugin
 * (say a client extension), the structure of the plugin and the function to register it will be slightly different.
 *
 * Please refer to:
 * Examples plugins - https://github.com/camunda/camunda-modeler-plugins
 * Plugin documentation - https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins/
 */

import {
  registerBpmnJSPlugin
} from 'camunda-modeler-plugin-helpers';

import ApiWebExtension from './api-web-extension';
const plugin = ApiWebExtension

registerBpmnJSPlugin(plugin);
