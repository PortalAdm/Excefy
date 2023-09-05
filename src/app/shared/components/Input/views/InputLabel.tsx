import { LabelHTMLAttributes } from 'react';
import { inputLabelTv } from '../InputTV';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  name: string;
}

export function InputLabel({ label, name, ...pros }: InputLabelProps) {
  return (
    <label {...pros} htmlFor={name} className={inputLabelTv()}>
      {label}
    </label>
  );
}
