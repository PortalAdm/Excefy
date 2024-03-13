import { HtmlHTMLAttributes } from 'react';
import { TRootComponent } from '~/src/app/shared/types';

type TKeyboardShotcutRootProps = HtmlHTMLAttributes<HTMLElement> & TRootComponent;

export function KeyboardShotcutRoot({ children }: TKeyboardShotcutRootProps) {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
}
