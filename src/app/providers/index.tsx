'use client';

import { ReactNode } from 'react';
import { AppThemeProvider } from '~contexts/ThemeProvider';
import { ToastContextProvider } from '~contexts/ToastContext';
import { AuthContextProvider } from '~contexts/AuthContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../shared/services/reactQuery';
import { BpmnContextProvider } from '~contexts/BpmnContext';
import { TRootComponent } from '~/src/app/shared/types';

export function Providers({ children }: TRootComponent) {
  const composeProviders =
    (...providers: { ({ children }: TRootComponent): JSX.Element }[]) =>
    (props: { children: ReactNode }) =>
      providers.reduceRight(
        (children, Provider) => <Provider {...props}>{children}</Provider>,
        props.children
      );

  const AllProviders = composeProviders(
    AppThemeProvider,
    BpmnContextProvider,
    ToastContextProvider,
    AuthContextProvider
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AllProviders>{children}</AllProviders>
    </QueryClientProvider>
  );
}
