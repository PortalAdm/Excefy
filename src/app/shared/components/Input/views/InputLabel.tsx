import { LabelHTMLAttributes } from 'react';
import { inputLabelTv } from '../InputTV';
import { VariantProps } from 'tailwind-variants';

interface InputLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof inputLabelTv> {
  label: string;
  name: string;
}

export function InputLabel({ label, name, labelSize, ...pros }: InputLabelProps) {
  return (
    <label {...pros} htmlFor={name} className={inputLabelTv({ labelSize })}>
      {label}
    </label>
  );
}
