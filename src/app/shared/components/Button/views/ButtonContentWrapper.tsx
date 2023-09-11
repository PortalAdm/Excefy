import { ReactNode } from 'react';
import { buttonContentWrapperTv } from '../ButtonTV';

interface ButtonContentWrapperProps {
  children: ReactNode;
}

export function ButtonContentWrapper({ children }: ButtonContentWrapperProps) {
  return <div className={buttonContentWrapperTv()}>{children}</div>;
}
