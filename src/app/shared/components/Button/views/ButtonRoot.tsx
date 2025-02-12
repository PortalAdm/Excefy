import { VariantProps } from 'tailwind-variants';
import { buttonRootTv } from '../ButtonTV';
import { ReactNode } from 'react';

export interface ButtonRootProps extends VariantProps<typeof buttonRootTv> {
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
  variant,
  ...props
}: ButtonRootProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={buttonRootTv({ size, color, className, variant })}
    >
      {children}
    </button>
  );
}
