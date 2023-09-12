'use client';

import { Switch } from '~shared/components/Switch';
import { Tooltip } from '~shared/components/Tooltip';

interface TableStatusProps {
  checked: boolean;
}

export function TableStatus({ checked }: TableStatusProps) {
  const tooltipText = checked ? 'Ativar' : 'Inativar';

  return (
    <Tooltip text={tooltipText}>
      <Switch size="small" checked={checked} />
    </Tooltip>
  );
}
