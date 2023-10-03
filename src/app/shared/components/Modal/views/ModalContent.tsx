import { ReactNode } from 'react';
import { ModalContentTv } from '../ModalTV';

interface ModalContentProps {
  children: ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  return <div className={ModalContentTv()}>{children}</div>;
}
