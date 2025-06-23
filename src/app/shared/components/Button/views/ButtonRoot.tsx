import { VariantProps } from 'tailwind-variants';
import { buttonRootTv } from '../ButtonTV';
import { forwardRef, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonRootProps extends VariantProps<typeof buttonRootTv> {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
  asChild?: boolean;
}

export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, disabled, size, color, className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        {...props}
        ref={ref}
        disabled={disabled}
        className={buttonRootTv({ size, color, className, variant })}
      >
        {children}
      </Comp>
    );
  }
);

ButtonRoot.displayName = 'ButtonRoot';
