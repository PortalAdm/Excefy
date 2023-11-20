'use client';

import { Bpmn } from '~features/diagramView';
import { KeyboardShotcut } from '~features/KeyboardShotcut';

export default function NewProcesspage() {
  return (
    <Bpmn.root>
      <Bpmn.header />
      <Bpmn.view>
        <KeyboardShotcut />
      </Bpmn.view>
    </Bpmn.root>
  );
}
