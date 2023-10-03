'use client';

import { Button } from '~shared/components/Button';
import { buttons } from '../DiagramViewUtils';
import { useBPMN } from '~/src/app/shared/hooks/useBPMN';

export function BpmnHeader() {
  const { isDisabled, setXml } = useBPMN();

  return (
    <div className="sm:px-6 h-20 sm:h-24 flex justify-end">
      <div className="w-fit px-2 flex flex-row justify-end overflow-y-hidden sm:overflow-auto flex-wrap gap-2 items-center">
        {buttons.map((button, i) => (
          <Button.root
            disabled={i !== 0 && isDisabled}
            size="small"
            key={i}
            color="transparent"
            variant="bordered"
          >
            {i !== 2 && (
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
        ))}
      </div>
    </div>
  );
}
