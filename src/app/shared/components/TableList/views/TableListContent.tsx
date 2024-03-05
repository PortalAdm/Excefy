import { TTableListContent } from '~shared/types/TTableListContent';
import { TableList } from '..';
import * as tv from '../TableListTV';

interface TableListContentProps {
  content: TTableListContent[];
}

export function TableListContent({ content = [] }: TableListContentProps) {
  if (!content.length) return null;

  const formatDate = (dateString: string) => {
    if (dateString === '') return;

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const createdAt = (date: string) => formatDate(date);
  const lastEdited = (date: string) => formatDate(date);

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
