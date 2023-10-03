'use client';

import { useState } from 'react';
import { Button } from '~shared/components/Button';
import { buttons } from '../DiagramViewUtils';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';
import { Modal } from '~/src/app/shared/components/Modal';
import { KeyValue } from '~types/IKeyValue';
import { DownloadModal } from './DownloadModal';
import { ClearModal } from './ClearModal';
import { BpmnHeaderContentTv, BpmnHeaderRootTv } from '../DiagramViewTV';

export function BpmnHeader() {
  const [idx, setIdx] = useState(0);
  const { isDisabled, setXml } = useBPMN();

  const modal: KeyValue = {
    1: DownloadModal(),
    2: ClearModal()
  };

  return (
    <div className={BpmnHeaderRootTv()}>
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
