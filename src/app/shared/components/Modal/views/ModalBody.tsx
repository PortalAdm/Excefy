import { HTMLAttributes, ReactNode } from 'react';
import { ModalBodyTv } from '../ModalTV';

interface ModalBodyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div className={ModalBodyTv()}>{children}</div>;
}
