'use client';

import '~global/styles/globals.css';
import { Providers } from '~/src/app/providers';
import { MainContainer } from '~/src/app/shared/components/MainContainer';
import { Head } from '~/src/app/features/header';
import { actions } from '../pageUtils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Excefy | Painel</title>
      <Providers>
        <MainContainer>
          <div className="flex flex-col w-full h-full">
            <Head.Header actions={actions} />
            {children}
          </div>
        </MainContainer>
      </Providers>
    </>
  );
}
