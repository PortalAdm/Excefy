import { ReactNode } from 'react';
import { HeaderRootTv } from '../HeaderTV';

interface HeaderRootProps {
  children: ReactNode;
}

export function HeaderRoot({ children }: HeaderRootProps) {
  return <div className={HeaderRootTv()}>{children}</div>;
}
