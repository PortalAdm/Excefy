'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '~/src/app/shared/hooks/useAuth';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

interface PrivateRouteRootProps {
  children: ReactNode;
}

export function PrivateRouteRoot({ children }: PrivateRouteRootProps) {
  const { push } = useRouter();
  const { hasToken } = useAuth();

  useEffect(() => {
    if (!hasToken) {
      return push(APP_ROUTES.public.auth);
    }
  }, [hasToken, push]);

  return (
    <>
      {!hasToken && null}
      {hasToken && children}
    </>
  );
}
