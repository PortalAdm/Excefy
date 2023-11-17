import { ReactNode } from 'react';
import { ModalTv } from '../ModalTV';
import { useModal } from '~hooks/useModal';
import { VariantProps } from 'tailwind-variants';

interface ModalRootProps extends VariantProps<typeof ModalTv> {
  children: ReactNode;
}

export function ModalRoot({ children, modalState }: ModalRootProps) {
  const { isModalOpen } = useModal();
  const modalStates: typeof modalState = isModalOpen ? 'open' : 'closed';

  return <div className={ModalTv({ modalState: modalStates })}>{children}</div>;
}
