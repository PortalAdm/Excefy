import { ReactNode } from 'react';
import { tableListRootTv } from '../TableListTV';

interface TableListRootProps {
  children: ReactNode;
}

export function TableListRoot({ children }: TableListRootProps) {
  return <table className={tableListRootTv()}>{children}</table>;
}
