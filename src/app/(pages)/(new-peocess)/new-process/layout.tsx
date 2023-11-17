'use client';

import '~global/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from '~/src/app/providers';
import { MainContainer } from '~/src/app/shared/components/MainContainer';
import { PublicRoute } from '~/src/app/features/PublicRoute';
import { PrivateRoute } from '~/src/app/features/PrivateRoute';
import { Head } from '~/src/app/features/header';
import { actions } from './newProcessUtils';
import { usePathname } from 'next/navigation';
import { checkPublickRoute } from '~/src/app/shared/utils/checkPublickRoute';

export const metadata: Metadata = {
  title: 'Portal Administração',
  description: 'Projeto focado em gerenciamento de tarefas automatizadas.'
};

export default function NewProcessLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isPublicPage = checkPublickRoute(pathName!);

  return (
    <Providers>
      <MainContainer>
        {isPublicPage && <PublicRoute.root>{children}</PublicRoute.root>}
        {!isPublicPage && (
          <PrivateRoute.root>
            <div className="flex flex-col w-full">
              <Head.Header actions={actions} />
              {children}
            </div>
          </PrivateRoute.root>
        )}
      </MainContainer>
    </Providers>
  );
}
