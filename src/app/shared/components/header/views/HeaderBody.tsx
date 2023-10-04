import { HTMLAttributes, ReactNode } from 'react';
import { HeaderBodyTv } from '../HeaderTV';

interface ModalBodyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function HeaderBody({ children }: ModalBodyProps) {
  return <div className={HeaderBodyTv()}>{children}</div>;
}
