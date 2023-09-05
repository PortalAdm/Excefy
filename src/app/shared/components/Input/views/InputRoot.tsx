import { HTMLAttributes, ReactNode } from 'react';
import { inputRootTv } from '../InputTV';

interface InputRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function InputRoot({ children, ...props }: InputRootProps) {
  return (
    <div {...props} className={inputRootTv()}>
      {children}
    </div>
  );
}
