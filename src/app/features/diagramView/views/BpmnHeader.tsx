'use client';

import { Button } from '~shared/components/Button';
import { buttons } from '../DiagramViewUtils';
import { Modal } from '~/src/app/shared/components/Modal';
import { BpmnHeaderContentTv, BpmnHeaderRootTv } from '../DiagramViewTV';
import { useDiagramViewController } from '../controller';
import { TabsNavigation } from '~/src/app/shared/components/TabsNavigation';

export function BpmnHeader() {
  const { isDisabled, idx, modal, links, setXml, setIdx } = useDiagramViewController();

  return (
    <div className={BpmnHeaderRootTv()}>
      <TabsNavigation.root>
        <TabsNavigation.items links={links} />
      </TabsNavigation.root>
      <div className={BpmnHeaderContentTv()}>
        {buttons.map((button, i) => (
          <Modal.trigger key={i}>
            <Button.root
              disabled={i !== 0 && isDisabled}
              size="small"
              color="transparent"
              variant="bordered"
              onClick={() => setIdx(i)}
            >
              {i === 0 && (
                <input
                  type="file"
                  className="absolute opacity-0"
                  accept=".bpmn, svg"
                  onChange={(e) => button.onChange?.(e, setXml)}
                />
              )}
              <Button.icon icon={button.icon} />
              <Button.label color="primary" text={button.text} />
            </Button.root>
          </Modal.trigger>
        ))}
      </div>
      {modal[idx]}
    </div>
  );
}
