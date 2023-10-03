import { Bpmn } from '~features/diagramView';

export default function newProcesspage() {
  return (
    <Bpmn.root>
      <Bpmn.header />
      <Bpmn.view />
    </Bpmn.root>
  );
}
