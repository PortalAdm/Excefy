'use client';

import { InputHTMLAttributes } from 'react';
import { inputFieldTv } from '../InputTV';

interface InputControlledProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  controlled?: boolean;
}

export function InputControlled({ name, type, ...props }: InputControlledProps) {
  return <input {...props} id={name} type={type ?? name} className={inputFieldTv()} />;
}
