import '~global/styles/scrollbar.css';
import '~global/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '../providers';
import { MainContainer } from '../shared/components/MainContainer';
import { Menu } from '../features/menu/views/Menu';
import { Toast } from '../features/toast';
import { MainNavBar } from '~/src/app/(pages)/MainNavBar';
import Head from 'next/head';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <Head>
        <title>Execfy</title>
      </Head>
      <body>
        <Providers>
          <MainContainer>
            <Toast />
            <Menu />
            <div className="flex flex-col w-full h-full">
              <MainNavBar />
              {children}
              <SpeedInsights />
            </div>
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
