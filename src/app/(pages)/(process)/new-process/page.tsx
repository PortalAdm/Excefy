import { Bpmn } from '~features/diagramView';

export default function NewProcesspage() {
  return (
    <Bpmn.root>
      <Bpmn.view>
        <Bpmn.keyboardShotcut />
      </Bpmn.view>
    </Bpmn.root>
  );
}
