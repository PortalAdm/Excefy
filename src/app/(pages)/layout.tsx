import '~global/styles/scrollbar.css';
import '~global/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '../providers';
import { MainContainer } from '../features/MainContainer';
import { Toast } from '../features/toast';
import Head from 'next/head';
import { Menu } from '~/src/app/(pages)/Menu';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <Head>
        <title>Execfy</title>
      </Head>
      <body>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@bpmn-io/properties-panel/dist/assets/properties-panel.css"
        ></link>
        <Providers>
          <MainContainer>
            <Toast.root>
              <Toast.header />
              <Toast.info />
            </Toast.root>
            <Menu />
            <div className="flex flex-col w-full h-full">
              {children}
              <SpeedInsights />
            </div>
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
