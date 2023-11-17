'use client';

import { ButtonHTMLAttributes } from 'react';
import { FaRegKeyboard } from 'react-icons/fa';
import { Icon } from '~/src/app/shared/components/Icon';
import { KeyboardShotcutTriggerTv } from '../KeyboardShotcutTV';

interface KeyboardShotcutTriggerProps extends ButtonHTMLAttributes<HTMLElement> {}

export function KeyboardShotcutTrigger({ ...props }: KeyboardShotcutTriggerProps) {
  return (
    <button {...props} className={KeyboardShotcutTriggerTv()}>
      <Icon icon={FaRegKeyboard} />
    </button>
  );
}
