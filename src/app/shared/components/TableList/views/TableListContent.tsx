import { TTableListContent } from '~shared/types/TTableListContent';
import { Switch } from '~/src/app/features/Switch';
import { Tooltip } from '~shared/components/Tooltip';
import { Icon } from '~/src/app/shared/components/Icon';
import * as tv from '../TableListTV';
import { ElementType } from 'react';
import Link from 'next/link';
import { Project } from '../../../types/Project';

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
        return (
          <tr key={i} className={tv.tableListContentTrTv()}>
            <td className={tv.tableListContentNameTv()}>
              {type === 'projects' ? (
                <Link
                  href={`/projects/${(item as Project).projectId}/dashboard`}
                  className="text-primary cursor-pointer font-bold underline transition-all hover:brightness-125"
                >
                  {(item as Project).projectName}
                </Link>
              ) : (
                (item as TTableListContent).commandName
              )}
            </td>
            <td className={tv.tableListContentDescriptionTv()}>
              {type === 'projects'
                ? (item as Project).projectDescription
                : (item as TTableListContent).commandDescription}
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
                type === 'projects' ? 'w-[550px] flex justify-end items-center' : ''
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
