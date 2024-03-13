import { HTMLAttributes } from 'react';
import { inputRootTv } from '../InputTV';
import { TRootComponent } from '~/src/app/shared/types';

type TInputRootProps = HTMLAttributes<HTMLDivElement> & TRootComponent;

export function InputRoot({ children, ...props }: TInputRootProps) {
  return (
    <div {...props} className={inputRootTv()}>
      {children}
    </div>
  );
}
