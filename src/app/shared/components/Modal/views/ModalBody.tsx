import { HTMLAttributes } from 'react';
import { ModalBodyTv } from '../ModalTV';
import { TRootComponent } from '~/src/app/shared/types';

type TModalBodyProps = HTMLAttributes<HTMLElement> & TRootComponent;

export function ModalBody({ children }: TModalBodyProps) {
  return <div className={ModalBodyTv()}>{children}</div>;
}
