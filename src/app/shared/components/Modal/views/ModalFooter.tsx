import { ReactNode } from 'react';
import { ModalFooterTv } from '../ModalTV';

interface ModalFooterProps {
  children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className={ModalFooterTv()}>
      <div className="flex items-center gap-2 p-1">{children}</div>
    </div>
  );
}
