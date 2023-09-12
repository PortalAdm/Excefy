import { ReactNode } from 'react';
import { tableListRootTv } from '../TableListTV';

interface TableListRootProps {
  children: ReactNode;
}

export function TableListRoot({ children }: TableListRootProps) {
  return (
    <div className="p-2">
      <table className={tableListRootTv()}>{children}</table>
    </div>
  );
}
