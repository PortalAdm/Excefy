import { ReactNode } from 'react';
import { keyboardShotcutContainerTv } from '../KeyboardShotcutTV';
import { VariantProps } from 'tailwind-variants';

interface KeyboardShotcutContainerProps extends VariantProps<typeof keyboardShotcutContainerTv> {
  children: ReactNode;
  isShotcutOpen: boolean;
}

export function KeyboardShotcutContainer({
  children,
  isShotcutOpen,
  state
}: KeyboardShotcutContainerProps) {
  const keyboardShotcutState: typeof state = isShotcutOpen ? 'open' : 'closed';

  return (
    <div className={keyboardShotcutContainerTv({ state: keyboardShotcutState })}>{children}</div>
  );
}
