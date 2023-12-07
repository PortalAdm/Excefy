'use client';

import '~global/styles/scrollbar.css';
import '~global/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '../providers';
import { MainContainer } from '../shared/components/MainContainer';
import { Menu } from '../features/menu/views/Menu';
import { Toast } from '../features/toast';
import { PublicRoute } from '../features/PublicRoute';
import { PrivateRoute } from '../features/PrivateRoute';
import { usePathname } from 'next/navigation';
import { checkPublickRoute } from '../shared/utils/checkPublickRoute';
import { Head } from '~features/header';
import { actions } from '../(pages)/pageUtils';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isPublicPage = checkPublickRoute(pathName!);

  const shoulRenderHeader = isPublicPage;

  return (
    <html lang="pt-BR">
      <title>Excefy</title>
      <body>
        <Providers>
          <MainContainer>
            <Toast />
            <Menu />
            {isPublicPage && <PublicRoute.root>{children}</PublicRoute.root>}
            {!isPublicPage && (
              <PrivateRoute.root>
                <div className="flex flex-col w-full h-full">
                  {shoulRenderHeader && <Head.Header actions={actions} />}
                  {children}
                  <SpeedInsights />
                </div>
              </PrivateRoute.root>
            )}
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
