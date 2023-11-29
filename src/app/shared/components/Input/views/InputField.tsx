'use client';

import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { inputFieldTv } from '../InputTV';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  controlled?: boolean;
}

export function InputField({ name, type, placeholder, ...props }: InputFieldProps) {
  const { register } = useFormContext();

  return (
    <input
      {...props}
      {...register(name)}
      id={name}
      type={type ?? name}
      placeholder={placeholder}
      className={inputFieldTv()}
    />
  );
}
