import { FormHTMLAttributes } from 'react';
import { TRootComponent } from '~/src/app/shared/types';

type FormProps = TRootComponent & FormHTMLAttributes<HTMLFormElement>;

export function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}
