'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { checkPublickRoute } from '~/src/app/shared/utils/checkPublickRoute';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { userSession } from '~/src/app/shared/utils/constants/userSession';

interface PrivateRouteRootProps {
  children: ReactNode;
}

export function PrivateRouteRoot({ children }: PrivateRouteRootProps) {
  const { push } = useRouter();
  const { getLocalStorage } = useLocalStorage();

  const pathName = usePathname();
  const hasToken = getLocalStorage(userSession);
  const isPublicPage = checkPublickRoute(pathName!);

  useEffect(() => {
    if (!hasToken) {
      return push(APP_ROUTES.public.home);
    }
  }, [hasToken, isPublicPage, push]);

  return (
    <>
      {!hasToken && isPublicPage && null}
      {hasToken && !isPublicPage && children}
    </>
  );
}
