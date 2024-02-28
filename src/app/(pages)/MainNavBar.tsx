'use client';

import { usePathname } from 'next/navigation';
import { action } from './dashboard/dashboardUtils';
import { checkPublickRoute } from '~/src/app/shared/utils/checkPublickRoute';
import { Header } from '~/src/app/features/header';

export function MainNavBar() {
  const pathName = usePathname();
  const isPublicPage = checkPublickRoute(pathName!);

  const shoulRenderHeader = isPublicPage;

  if (!shoulRenderHeader) return null;

  return (
    <Header.root>
      <Header.title />
      <Header.content>
        <Header.action {...action} />
        <Header.divisor />
        <Header.label />
      </Header.content>
    </Header.root>
  );
}
