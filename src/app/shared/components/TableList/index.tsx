import { TableSkeleton } from '~/src/app/shared/components/TableList/views/TableSkeleton';
import { TableListContent } from './views/TableListContent';
import { TableListContentBody } from './views/TableListContentBody';
import { TableListHeader } from './views/TableListHeader';
import { TableListRoot } from './views/TableListRoot';
import { TableListTh } from './views/TableListTh';
import { TablePagination } from './views/TablePagination';
import { DeleteProcessModal } from '~/src/app/shared/components/TableList/views/modal/DeleteProcessModal';

export const TableList = {
  root: TableListRoot,
  header: TableListHeader,
  name: TableListTh,
  body: TableListContentBody,
  content: TableListContent,
  pagination: TablePagination,
  Skeleton: TableSkeleton,
  modals: {
    delete: DeleteProcessModal
  }
};
