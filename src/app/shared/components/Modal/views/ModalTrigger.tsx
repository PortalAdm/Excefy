import { ReactNode } from 'react';
import { useModal } from '~hooks/useModal';

interface ModalTriggerProps {
  children: ReactNode;
}

export function ModalTrigger({ children }: ModalTriggerProps) {
  const { changeModalState } = useModal();

  return (
    <div id="Trigger" onClick={changeModalState}>
      {children}
    </div>
  );
}
