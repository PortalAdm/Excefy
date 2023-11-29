'use client';

import { TextareaHTMLAttributes } from 'react';
import { InputTextareaTv } from '../InputTV';

interface InputControlledTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export function InputControlledTextarea({
  name,
  placeholder,
  ...props
}: InputControlledTextareaProps) {
  return <textarea {...props} id={name} placeholder={placeholder} className={InputTextareaTv()} />;
}
