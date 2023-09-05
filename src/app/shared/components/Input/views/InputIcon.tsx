import { ElementType } from 'react';
import { InputIconTv } from '../InputTV';

interface InputIconProps {
  icon: ElementType;
  onClick: () => void;
}

export function InputIcon({ icon: Icon, ...props }: InputIconProps) {
  return <Icon className={InputIconTv()} {...props} />;
}
