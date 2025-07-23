import { TTableListContent } from '~shared/types/TTableListContent';
import { Switch } from '~/src/app/features/Switch';
import { Tooltip } from '~shared/components/Tooltip';
import { Icon } from '~/src/app/shared/components/Icon';
import * as tv from '../TableListTV';
import { ElementType } from 'react';
import Link from 'next/link';
import { Project } from '../../../types/Project';
import { COPILOT_OBJECT_TYPE, ITEM_ICON } from '~/src/app/features/copilot/constants';
import { IconType } from 'react-icons/lib';

type TTableListActions = {
  element: ElementType;
  name: string;
  onClick?: (listItem: TTableListContent) => void;
};

interface TableListContentProps<T extends 'dashboard' | 'projects'> {
  type: T;
  content: T extends 'dashboard' ? TTableListContent[] : Project[];
  createdAt: (date: string) => string | undefined;
  lastEdited: (date: string) => string;
  actions: TTableListActions[];
}

export function TableListContent<T extends 'dashboard' | 'projects'>({
  type,
  content = [],
  createdAt,
  lastEdited,
  actions
}: TableListContentProps<T>) {
  if (!content.length) return null;

  return (
    <>
      {content.map((item, i) => {
        const checked = type === 'projects' ? true : (item as TTableListContent).enable;
        const tooltipText = checked ? 'Ativar' : 'Inativar';

        let ItemIcon: IconType | null = null;
        let typeLabel: string | null = null;

        if (type === 'dashboard') {
          switch ((item as TTableListContent).objectType) {
            case COPILOT_OBJECT_TYPE.PROCESS:
              ItemIcon = ITEM_ICON.PROCESS;
              typeLabel = 'Processo';
              break;
            case COPILOT_OBJECT_TYPE.FORM:
              ItemIcon = ITEM_ICON.FORM;
              typeLabel = 'Formulário';
              break;
          }
        }

        return (
          <tr key={i} className={tv.tableListContentTrTv()}>
            <td className={`${type === 'dashboard' ? 'w-52' : ''} p-2 text-sm h-16`}>
              <div className={type === 'dashboard' ? 'w-52 truncate' : 'w-40 truncate'}>
                {type === 'projects' ? (
                  <Link
                    title={(item as Project).projectName}
                    href={`/projects/${(item as Project).projectId}/dashboard`}
                    className="text-primary truncate cursor-pointer font-bold underline transition-all hover:brightness-125"
                  >
                    {(item as Project).projectName}
                  </Link>
                ) : (
                  <div className="flex gap-2 items-center truncate">
                    {ItemIcon && <ItemIcon className="w-5 h-5 shrink-0 text-primary/80" />}

                    <div className="flex flex-col truncate">
                      <span
                        title={(item as TTableListContent).commandName}
                        className="text-[16px] text-black/80 leading-4 truncate"
                      >
                        {(item as TTableListContent).commandName || '-'}
                      </span>

                      {typeLabel && <span className="text-[13px]">{typeLabel}</span>}
                    </div>
                  </div>
                )}
              </div>
            </td>
            <td className={`${type === 'dashboard' ? 'w-40' : ''} p-2 text-sm`}>
              <p
                title={
                  type === 'projects'
                    ? (item as Project).projectDescription
                    : (item as TTableListContent).commandDescription
                }
                className="w-40 truncate"
              >
                {type === 'projects'
                  ? (item as Project).projectDescription
                  : (item as TTableListContent).commandDescription}
              </p>
            </td>

            {type === 'dashboard' && (
              <td className={tv.tableDateTv()}>
                {createdAt((item as TTableListContent).createdAt || '')}
              </td>
            )}

            {type === 'dashboard' && (
              <>
                <td className={tv.tableDateTv()}>
                  {lastEdited((item as TTableListContent).lastEdited || '')}
                </td>
                <td className={tv.tableListContentStatusTv()}>
                  <Tooltip text={tooltipText}>
                    <Switch size="small" checked={checked || false} />
                  </Tooltip>
                </td>
              </>
            )}

            <td
              className={`${tv.tableListContentStatusTv()} ${
                type === 'projects' ? 'w-[518px] flex justify-end items-center' : ''
              }`}
            >
              <div className={tv.tableListButtonsTv()}>
                {actions
                  .filter((icon) => !!icon.onClick)
                  .map((icon, i) => (
                    <Tooltip key={i} text={icon.name}>
                      <Icon
                        icon={icon.element}
                        onClick={() => icon.onClick!(item as TTableListContent)}
                      />
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
