'use client';

import { TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputTextareaTv } from '../InputTV';

interface InputTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  controlled?: boolean;
}

export function InputTextarea({ name, placeholder, controlled, ...props }: InputTextareaProps) {
  const { register } = useFormContext();

  if (controlled)
    return (
      <textarea {...props} id={name} placeholder={placeholder} className={InputTextareaTv()} />
    );

  return (
    <textarea
      {...props}
      {...register(name)}
      id={name}
      placeholder={placeholder}
      className={InputTextareaTv()}
    />
  );
}
