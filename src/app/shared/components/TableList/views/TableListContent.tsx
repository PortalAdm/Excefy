import { TTableListContentType } from '~types/index';
import { TableList } from '..';
import * as tv from '../TableListTV';

interface TableListContentProps {
  content: TTableListContentType[];
}

export function TableListContent({ content = [] }: TableListContentProps) {
  if (!content.length) return null;

  return (
    <>
      {content.map((item, i) => (
        <tr key={i} className={tv.tableListContentTrTv()}>
          <td className={tv.tableListContentNameTv()}>{item.name}</td>
          <td className={tv.tableListContentDescriptionTv()}>{item.description}</td>
          <td className={tv.tableDateTv()}>{item.criation}</td>
          <td className={tv.tableDateTv()}>{item.lastEdit}</td>
          <td className={tv.tableListContentStatusTv()}>
            <TableList.status checked={item.status} />
          </td>
          <td className={tv.tableListContentStatusTv()}>
            <TableList.buttons />
          </td>
        </tr>
      ))}
    </>
  );
}
