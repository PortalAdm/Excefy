'use client';

import '~global/styles/globals.css';
import { Providers } from '~/src/app/providers';

export default function NewProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Excefy | Configuração do processo</title>
      <Providers>
        <div className="flex flex-col w-full h-fit overflow-hidden">
          <div className="py-4 px-9">{children}</div>
        </div>
      </Providers>
    </>
  );
}
