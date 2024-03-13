'use client';

import { Text } from '~shared/components/Text';
import { useToast } from '~hooks/useToast';

interface ToastInfoProps {
  text?: string;
}

export function ToastInfo({ text }: ToastInfoProps) {
  const { toastOptions } = useToast();

  return <Text text={toastOptions.messageDescription ?? text} size="sm" color="placeholder" />;
}
