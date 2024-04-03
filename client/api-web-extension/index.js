import ApiWebExtension from './ApiWebExtension';

/**
 * A bpmn-js module, defining all extension services and their dependencies.
 *
 * --------
 *
 * WARNING: This is an example only.
 *
 * Make sure you choose a unique name under which your extension service
 * is exposed (i.e. change PLEASE_CHANGE_ME to something unique).
 *
 * --------
 *
 */
export default {
  __init__: [ 'API_WEB_EXTENSION' ],
  API_WEB_EXTENSION: ['type', ApiWebExtension ]
};
