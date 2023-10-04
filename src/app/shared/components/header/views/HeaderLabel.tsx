import { ReactNode } from 'react';
import { HeaderLabelTv } from '../HeaderTV';

interface HeaderLabelProps {
  children: ReactNode;
}

export function HeaderLabel({ children }: HeaderLabelProps) {
  return <div className={HeaderLabelTv()}>{children}</div>;
}
