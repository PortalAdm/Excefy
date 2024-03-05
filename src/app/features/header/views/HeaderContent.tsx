import { ReactNode } from 'react';
import { HeaderContentTv } from '../HeaderTV';

interface HeaderContentProps {
  children: ReactNode;
}

export function HeaderContent({ children }: HeaderContentProps) {
  return <div className={HeaderContentTv()}>{children}</div>;
}
