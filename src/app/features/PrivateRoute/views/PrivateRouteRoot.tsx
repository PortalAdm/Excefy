'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { checkUserAuthenticated } from '~/src/app/shared/utils/checkUserAuthenticated';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

interface PrivateRouteRootProps {
  children: ReactNode;
}

export function PrivateRouteRoot({ children }: PrivateRouteRootProps) {
  const { push } = useRouter();

  const isUserAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.auth);
    }
  }, [isUserAuthenticated, push]);

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
}
