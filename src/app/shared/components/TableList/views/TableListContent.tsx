import { TTableListContent } from '~shared/types/TTableListContent';
import { Switch } from '~/src/app/features/Switch';
import { Tooltip } from '~shared/components/Tooltip';
import { Icon } from '~/src/app/shared/components/Icon';
import * as tv from '../TableListTV';
import { ElementType } from 'react';

type TTableListActions = {
  element: ElementType;
  name: string;
  onClick: (listItem: TTableListContent) => void;
};

interface TableListContentProps {
  content: TTableListContent[];
  createdAt: (date: string) => string | undefined;
  lastEdited: (date: string) => string;
  actions: TTableListActions[];
}

export function TableListContent({
  content = [],
  createdAt,
  lastEdited,
  actions
}: TableListContentProps) {
  if (!content.length) return null;

  return (
    <>
      {content.map((item, i) => {
        const checked = item.enable || false;
        const tooltipText = checked ? 'Ativar' : 'Inativar';
        return (
          <tr key={i} className={tv.tableListContentTrTv()}>
            <td className={tv.tableListContentNameTv()}>{item.commandName}</td>
            <td className={tv.tableListContentDescriptionTv()}>{item.commandDescription}</td>
            <td className={tv.tableDateTv()}>{createdAt(item.createdAt || '')}</td>
            <td className={tv.tableDateTv()}>{lastEdited(item.lastEdited || '')}</td>
            <td className={tv.tableListContentStatusTv()}>
              <Tooltip text={tooltipText}>
                <Switch size="small" checked={checked} />
              </Tooltip>
            </td>
            <td className={tv.tableListContentStatusTv()}>
              <div className={tv.tableListButtonsTv()}>
                {actions.map((icon, i) => (
                  <Tooltip key={i} text={icon.name}>
                    <Icon icon={icon.element} onClick={() => icon.onClick(item)} />
                  </Tooltip>
                ))}
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
