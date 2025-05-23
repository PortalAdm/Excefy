import { TTableListContent } from '~shared/types/TTableListContent';
import { Switch } from '~/src/app/features/Switch';
import { Tooltip } from '~shared/components/Tooltip';
import { Icon } from '~/src/app/shared/components/Icon';
import * as tv from '../TableListTV';
import { ElementType } from 'react';
import Link from 'next/link';

type TTableListActions = {
  element: ElementType;
  name: string;
  onClick?: (listItem: TTableListContent) => void;
};

interface TableListContentProps {
  type: 'dashboard' | 'projects';
  content: TTableListContent[];
  createdAt: (date: string) => string | undefined;
  lastEdited: (date: string) => string;
  actions: TTableListActions[];
}

export function TableListContent({
  type,
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
            <td className={tv.tableListContentNameTv()}>
              {type === 'projects' ? (
                <Link
                  href={`/projects/${item.commandId}/dashboard`}
                  className="text-primary cursor-pointer font-bold underline transition-all hover:brightness-125"
                >
                  {item.commandName}
                </Link>
              ) : (
                item.commandName
              )}
            </td>
            <td className={tv.tableListContentDescriptionTv()}>{item.commandDescription}</td>
            <td className={`${tv.tableDateTv()} ${type === 'projects' ? 'w-[470px]' : ''}`}>
              {createdAt(item.createdAt || '')}
            </td>

            {type === 'dashboard' && (
              <>
                <td className={tv.tableDateTv()}>{lastEdited(item.lastEdited || '')}</td>
                <td className={tv.tableListContentStatusTv()}>
                  <Tooltip text={tooltipText}>
                    <Switch size="small" checked={checked} />
                  </Tooltip>
                </td>
              </>
            )}

            <td className={tv.tableListContentStatusTv()}>
              <div className={tv.tableListButtonsTv()}>
                {actions
                  .filter((icon) => !!icon.onClick)
                  .map((icon, i) => (
                    <Tooltip key={i} text={icon.name}>
                      <Icon icon={icon.element} onClick={() => icon.onClick!(item)} />
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
