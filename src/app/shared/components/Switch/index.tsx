'use client';

import { useState } from 'react';
import { switchRootTv, switchThumbTv } from './SwitchTv';
import { VariantProps } from 'tailwind-variants';
import * as SwitchRadix from '@radix-ui/react-switch';

interface SwitchProps extends VariantProps<typeof switchRootTv> {
  checked: boolean;
}

export function Switch({ checked, size }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckChange = () => setIsChecked((isChecked) => !isChecked);

  return (
    <SwitchRadix.Root
      onCheckedChange={handleCheckChange}
      checked={isChecked}
      className={switchRootTv({ size })}
    >
      <SwitchRadix.Thumb className={switchThumbTv({ size })} />
    </SwitchRadix.Root>
  );
}
