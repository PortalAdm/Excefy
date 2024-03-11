import { TTableListContent } from '~shared/types/TTableListContent';
import { TableList } from '..';
import * as tv from '../TableListTV';
import { formatDate, formatModificationDate } from '../../../utils/dateUtils';

interface TableListContentProps {
  content: TTableListContent[];
}

export function TableListContent({ content = [] }: TableListContentProps) {
  if (!content.length) return null;

  const createdAt = (date: string) => formatDate(new Date(date));
  const lastEdited = (date: string) => {
    const originalDate = new Date(date);
    const adjustedDate = isNaN(originalDate?.getTime()) ? null : new Date(originalDate.getTime() - 3 * 60 * 60 * 1000);
    return adjustedDate ? formatModificationDate(adjustedDate.toISOString(), true) : '';
  };

  return (
    <>
      {content.map((item, i) => (
        <tr key={i} className={tv.tableListContentTrTv()}>
          <td className={tv.tableListContentNameTv()}>{item.commandName}</td>
          <td className={tv.tableListContentDescriptionTv()}>{item.commandDescription}</td>
          <td className={tv.tableDateTv()}>{createdAt(item.createdAt || '')}</td>
          <td className={tv.tableDateTv()}>{lastEdited(item.lastEdited || '')}</td>
          <td className={tv.tableListContentStatusTv()}>
            <TableList.status checked={item.enable || false} />
          </td>
          <td className={tv.tableListContentStatusTv()}>
            <TableList.buttons listItem={item} />
          </td>
        </tr>
      ))}
    </>
  );
}
