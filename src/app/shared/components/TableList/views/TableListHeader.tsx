import { ReactNode } from 'react';
import { tableListHeaderTV } from '../TableListTV';

interface TableListHeaderProps {
  children: ReactNode;
}

export function TableListHeader({ children }: TableListHeaderProps) {
  return (
    <thead className="w-[870px]">
      <tr className={tableListHeaderTV()}>{children}</tr>
    </thead>
  );
}
