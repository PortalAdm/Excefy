import { ReactNode } from 'react';
import { HeaderTitleTv } from '../HeaderTV';

interface HeaderTitleProps {
  children: ReactNode;
}

export function HeaderTitle({ children }: HeaderTitleProps) {
  return <div className={HeaderTitleTv()}>{children}</div>;
}
