import { TTableListContent } from '~shared/types/TTableListContent';
import { TableListController } from '~/src/app/shared/components/TableList/controller';
import { Switch } from '~/src/app/features/Switch';
import { Tooltip } from '~shared/components/Tooltip';
import { Icon } from '~/src/app/shared/components/Icon';
import * as tv from '../TableListTV';

interface TableListContentProps {
  content: TTableListContent[];
}

export function TableListContent({ content = [] }: TableListContentProps) {
  const { createdAt, lastEdited, actions } = TableListController();

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
