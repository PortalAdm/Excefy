// Provedores devem ser adicionados aqui
'use client';

import { ReactNode } from 'react';
import { AppThemeProvider } from '~contexts/ThemeProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const composeProviders =
    (
      ...providers: {
        ({ children }: any): JSX.Element;
      }[]
    ) =>
    (props: { children: any }) =>
      providers.reduceRight(
        (children, Provider) => <Provider {...props}>{children}</Provider>,
        props.children
      );

  const AllProviders = composeProviders(AppThemeProvider);

  return <AllProviders>{children}</AllProviders>;
}
