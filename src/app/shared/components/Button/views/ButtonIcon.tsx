import { ElementType } from 'react';
import { buttonIconTv } from '../ButtonTV';

interface ButtonIconProps {
  icon: ElementType;
}

export function ButtonIcon({ icon: Icon }: ButtonIconProps) {
  return <Icon className={buttonIconTv()} />;
}
