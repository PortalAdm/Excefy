'use client';

import { ReactNode } from 'react';
import { ToastRootTv } from '../ToastTV';
import { VariantProps } from 'tailwind-variants';
import { useToast } from '~hooks/useToast';

interface ToastRootProps extends VariantProps<typeof ToastRootTv> {
  children: ReactNode;
}

export function ToastRoot({ children, state, visible, ...props }: ToastRootProps) {
  const { toastOptions } = useToast();

  const toastState: typeof state = toastOptions.state === 'success' ? 'success' : 'error';
  const isVisible: typeof visible = toastOptions.isActive ? 'visible' : 'hidden';

  if (!toastOptions.isActive) return null;

  return (
    <div {...props} className={ToastRootTv({ state: toastState, visible: isVisible })}>
      {children}
    </div>
  );
}
