import { Bpmn } from '~features/diagramView';

interface EditProcesspage {
  params: {
    commandId: string;
  };
}

export default function EditProcesspage() {
  return (
    <Bpmn.root>
      <Bpmn.view>
        <Bpmn.keyboardShotcut />
      </Bpmn.view>
    </Bpmn.root>
  );
}
