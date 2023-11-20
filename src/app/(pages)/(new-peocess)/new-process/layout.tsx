'use client';

import '~global/styles/globals.css';
import { Providers } from '~/src/app/providers';
import { MainContainer } from '~/src/app/shared/components/MainContainer';
import { Head } from '~/src/app/features/header';
import { actions } from './newProcessUtils';

export default function NewProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>IaLogue | Novo Processo</title>
      <Providers>
        <MainContainer>
          <div className="flex flex-col w-full">
            <Head.Header actions={actions} />
            {children}
          </div>
        </MainContainer>
      </Providers>
    </>
  );
}
