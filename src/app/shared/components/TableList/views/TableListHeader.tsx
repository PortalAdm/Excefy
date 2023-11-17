import { ReactNode } from 'react';
import { tableListHeaderTV } from '../TableListTV';

interface TableListHeaderProps {
  children: ReactNode;
}

export function TableListHeader({ children }: TableListHeaderProps) {
  return (
    <thead>
      <tr className={tableListHeaderTV()}>{children}</tr>
    </thead>
  );
}
