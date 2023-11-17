import * as TooltipRadix from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';
import { Text } from '~shared/components/Text';
import { capitalizeName } from '~utils/transformers';
import { arrowTv, contentTv } from './TooltipTv';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export function Tooltip({ children, text }: TooltipProps) {
  const timeToAppear = 0;

  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root delayDuration={timeToAppear}>
        <TooltipRadix.Trigger asChild>
          <span className="w-fit">{children}</span>
        </TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content className={contentTv()}>
            <Text text={capitalizeName(text)} color="white" size="sm" />
            <TooltipRadix.Arrow className={arrowTv()} />
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}
