'use client';

import { Icon } from '~shared/components/Icon';
import { Tooltip } from '~shared/components/Tooltip';
import { tableListButtonsTv } from '../TableListTV';
import { icons } from '../TableListutils';

export function TableListButtons() {
  return (
    <div className={tableListButtonsTv()}>
      {icons.map((icon, i) => (
        <Tooltip key={i} text={icon.name}>
          <Icon icon={icon.element} onClick={icon.onClick} />
        </Tooltip>
      ))}
    </div>
  );
}
