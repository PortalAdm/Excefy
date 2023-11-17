import { ReactNode } from 'react';
import { tableListContentBodyTv } from '../TableListTV';

interface TableListContentBodyProps {
  children: ReactNode;
}

export function TableListContentBody({ children }: TableListContentBodyProps) {
  return <tbody className={tableListContentBodyTv()}>{children}</tbody>;
}
