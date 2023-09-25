import { TableList } from '~shared/components/TableList';
import { listHeaders, mocckedProcessContent } from '../dashboardUtils';

export function ProcessList() {
  return (
    <TableList.root>
      <TableList.header>
        <TableList.name titles={listHeaders} />
      </TableList.header>
      <TableList.body>
        <TableList.content content={mocckedProcessContent} />
      </TableList.body>
    </TableList.root>
  );
}
