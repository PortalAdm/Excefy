import { VariantProps } from 'tailwind-variants';
import { buttonRootTv } from '../ButtonTV';
import { ReactNode } from 'react';

interface ButtonRootProps extends VariantProps<typeof buttonRootTv> {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
}

export function ButtonRoot({
  children,
  disabled,
  size,
  color,
  className,
  ...props
}: ButtonRootProps) {
  return (
    <button {...props} disabled={disabled} className={buttonRootTv({ size, color, className })}>
      {children}
    </button>
  );
}
