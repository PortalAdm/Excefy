import { HtmlHTMLAttributes, ReactNode } from 'react';

interface KeyboardShotcutRootProps extends HtmlHTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function KeyboardShotcutRoot({ children }: KeyboardShotcutRootProps) {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
}
