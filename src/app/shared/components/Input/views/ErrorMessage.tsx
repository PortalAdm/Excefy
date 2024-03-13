'use client';

import { useFormContext } from 'react-hook-form';
import { errorMessageTv } from '../InputTV';
import { Text } from '~shared/components/Text';
import { getInputError } from '~/src/app/shared/components/Input/InputUtils';

interface ErrorMessageProps {
  field: string;
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors }
  } = useFormContext();

  const fieldError = getInputError(errors, field);

  if (!fieldError) return null;

  return <Text as="span" className={errorMessageTv()} text={fieldError.message?.toString()} />;
}
