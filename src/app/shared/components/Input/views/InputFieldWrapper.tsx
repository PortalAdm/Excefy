import { ReactNode } from 'react';
import { inputFieldWrapperTv } from '~/src/app/shared/components/Input/InputTV';

interface InputFieldWrapperProps {
  children: ReactNode;
}

export function InputFieldWrapper({ children }: InputFieldWrapperProps) {
  return <div className={inputFieldWrapperTv()}>{children}</div>;
}
