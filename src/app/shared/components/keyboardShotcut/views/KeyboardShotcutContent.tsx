import { ReactNode } from 'react';
import { KeyboardShotcutContentTv } from '../KeyboardShotcutTV';

interface KeyboardShotcutContentProps {
  children: ReactNode;
}

export function KeyboardShotcutContent({ children }: KeyboardShotcutContentProps) {
  return <div className={KeyboardShotcutContentTv()}>{children}</div>;
}
