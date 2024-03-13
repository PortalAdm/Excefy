import { ModalTv } from '../ModalTV';
import { TRootComponent } from '~/src/app/shared/types';

interface ModalRootProps extends TRootComponent {
  modalState: boolean;
}

export function ModalRoot({ children, modalState }: ModalRootProps) {
  return <div className={ModalTv({ modalState: modalState })}>{children}</div>;
}
