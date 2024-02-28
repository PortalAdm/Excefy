import { Bpmn } from '~features/diagramView';
import { KeyboardShotcut } from '~features/KeyboardShotcut';

interface EditProcesspage {
  params: {
    commandId: string;
  };
}

export default function EditProcesspage({ params }: EditProcesspage) {
  return (
    <Bpmn.root>
      <Bpmn.view>
        <KeyboardShotcut />
      </Bpmn.view>
    </Bpmn.root>
  );
}
