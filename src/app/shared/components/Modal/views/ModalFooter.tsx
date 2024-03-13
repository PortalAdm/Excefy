import { TRootComponent } from '~/src/app/shared/types';
import { ModalFooterContentTv, ModalFooterTv } from '../ModalTV';

export function ModalFooter({ children }: TRootComponent) {
  return (
    <div className={ModalFooterTv()}>
      <div className={ModalFooterContentTv()}>{children}</div>
    </div>
  );
}
