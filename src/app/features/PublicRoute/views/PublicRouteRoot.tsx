'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { checkPublickRoute } from '~/src/app/shared/utils/checkPublickRoute';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { userSession } from '~/src/app/shared/utils/constants/userSession';

interface PublicRouteRootProps {
  children: ReactNode;
}

export function PublicRouteRoot({ children }: PublicRouteRootProps) {
  const { push } = useRouter();
  const { getLocalStorage } = useLocalStorage();

  const pathName = usePathname();
  const hasToken = getLocalStorage(userSession);
  const isPublicPage = checkPublickRoute(pathName!);

  useEffect(() => {
    if (hasToken) {
      return push(APP_ROUTES.private.dashboard.name);
    }
  }, [hasToken, isPublicPage, push]);

  return (
    <>
      {hasToken && !isPublicPage && null}
      {!hasToken && isPublicPage && children}
    </>
  );
}
