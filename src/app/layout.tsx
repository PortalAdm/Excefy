import '~global/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { MainContainer } from './shared/components/MainContainer';
import { Menu } from './features/menu/views/Menu';
import { Toast } from './features/toast';

export const metadata: Metadata = {
  title: 'Portal Administração',
  description: 'Projeto focado em gerenciamento de tarefas automatizadas.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <MainContainer>
            <Toast />
            <Menu />
            {children}
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
