/**
 * A bpmn-js service that provides the actual plug-in feature.
 *
 * Checkout the bpmn-js examples to learn about its capabilities
 * and the extension points it offers:
 *
 * https://github.com/bpmn-io/bpmn-js-examples
 */
export default function ApiWebExtension(eventBus, modeling) {
  eventBus.on('shape.added', function(event) {
    const element = event.element;

    // Check if the added shape is a task
    if (element.type === 'bpmn:Task') {
      // Add a URL property to the task
      modeling.updateProperties(element, {
        'camunda:properties': {
          'camunda:property': {
            'name': 'url',
            'value': 'https://example.com'
          }
        }
      });
    }
  });
}

ApiWebExtension.$inject = [
  'eventBus'
];
