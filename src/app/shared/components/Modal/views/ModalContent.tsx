import { TRootComponent } from '~/src/app/shared/types';
import { ModalContentTv } from '../ModalTV';

export function ModalContent({ children }: TRootComponent) {
  return <div className={ModalContentTv()}>{children}</div>;
}
