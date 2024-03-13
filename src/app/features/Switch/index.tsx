'use client';

import { switchRootTv, switchThumbTv } from './SwitchTv';
import { VariantProps } from 'tailwind-variants';
import * as SwitchRadix from '@radix-ui/react-switch';
import { useSwitchController } from '~/src/app/features/Switch/controller';

interface SwitchProps extends VariantProps<typeof switchRootTv> {
  checked: boolean;
}

export function Switch({ checked, size }: SwitchProps) {
  const { handleCheckChange, isChecked } = useSwitchController(checked);

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
