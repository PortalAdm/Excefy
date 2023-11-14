'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { checkPublickRoute } from '~/src/app/shared/utils/checkPublickRoute';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

interface PrivateRouteRootProps {
  children: ReactNode;
}

export function PrivateRouteRoot({ children }: PrivateRouteRootProps) {
  const { push } = useRouter();
  const { getLocalStorage } = useLocalStorage();

  const session = `_S`;

  const pathName = usePathname();
  const hasToken = getLocalStorage(session);
  const isPublicPage = checkPublickRoute(pathName!);

  console.log('É POSSÍVEL EXIBIR A ROTA PRIVADA?', hasToken && !isPublicPage);

  useEffect(() => {
    if (!hasToken) {
      return push(APP_ROUTES.public.auth);
    }
  }, [hasToken, isPublicPage, push]);

  return <>{hasToken && !isPublicPage && children}</>;
}
