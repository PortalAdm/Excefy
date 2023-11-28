'use client';

import '~global/styles/globals.css';
import { Providers } from '~/src/app/providers';
import { MainContainer } from '~/src/app/shared/components/MainContainer';

export default function NewProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Excefy | Configuração do processo</title>
      <Providers>
        <MainContainer>
          <div className="flex flex-col w-full">{children}</div>
        </MainContainer>
      </Providers>
    </>
  );
}
