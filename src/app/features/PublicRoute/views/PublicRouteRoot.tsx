'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { PrivateRoute } from '../../PrivateRoute';
import { checkPublickRoute } from '~/src/app/shared/utils/checkPublickRoute';
import { useAuth } from '~/src/app/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

interface PublicRouteRootProps {
  children: ReactNode;
}

export function PublicRouteRoot({ children }: PublicRouteRootProps) {
  const { push } = useRouter();
  const { hasToken } = useAuth();
  const pathName = usePathname();

  const isPublicPage = checkPublickRoute(pathName!);

  useEffect(() => {
    if (hasToken && isPublicPage) {
      return push(APP_ROUTES.private.dashboard.name);
    }
  }, [hasToken, isPublicPage, push]);

  return (
    <>
      {isPublicPage && <>{children}</>}
      {!isPublicPage && <PrivateRoute.root>{children}</PrivateRoute.root>}
    </>
  );
}
