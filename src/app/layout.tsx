'use client';

import '~global/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { MainContainer } from './shared/components/MainContainer';
import { Menu } from './features/menu/views/Menu';
import { Toast } from './features/toast';
import { usePathname } from 'next/navigation';
import { checkPublickRoute } from './shared/utils/checkPublickRoute';
import { PrivateRoute } from './features/PrivateRoute';

export const metadata: Metadata = {
  title: 'Portal Administração',
  description: 'Projeto focado em gerenciamento de tarefas automatizadas.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const isPublicPage = checkPublickRoute(pathName!);

  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <MainContainer>
            {isPublicPage && (
              <>
                <Toast />
                <Menu />
                {children}
              </>
            )}
            {!isPublicPage && <PrivateRoute.root>{children}</PrivateRoute.root>}
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
