import { TRootComponent } from '~/src/app/shared/types';
import { tableListHeaderTV } from '../TableListTV';

export function TableListHeader({ children }: TRootComponent) {
  return (
    <thead className="w-[870px]">
      <tr className={tableListHeaderTV()}>{children}</tr>
    </thead>
  );
}
