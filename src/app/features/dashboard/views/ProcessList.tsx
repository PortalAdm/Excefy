'use client'; // retirar o use client após a criação do header com o botão de sair

// o botão sair é apenas para teste momentâneo

import { TableList } from '~shared/components/TableList';
import { listHeaders, mocckedProcessContent } from '../dashboardUtils';
import { Button } from '~/src/app/shared/components/Button';
import { Header } from '../../header';
import { useAuthController } from '../../auth/controller/useAuthController';
import { usePromise } from '~/src/app/shared/hooks/usePromise';
import { useCallback } from 'react';
import { getAllProcess } from '../services';

export function ProcessList() {
  const { logout } = useAuthController();

  const getProcess = useCallback(async () => {
    return await getAllProcess();
  }, []);

  const { data } = usePromise(getProcess);

  console.log(data);

  return (
    <div className="w-full">
      <Header />

      <Button.root onClick={logout}>
        <Button.label text="Sair" />
      </Button.root>

      <div className="p-10">
        <Button.root size="small" className="mb-20">
          <Button.link href={'/new-process'}>
            <Button.contentWrapper>
              <Button.label text="Criar processo" color="white" size="lg" weigth="bold" />
            </Button.contentWrapper>
          </Button.link>
        </Button.root>

        <TableList.root>
          <TableList.header>
            <TableList.name titles={listHeaders} />
          </TableList.header>
          <TableList.body>
            <TableList.content content={mocckedProcessContent} />
          </TableList.body>
        </TableList.root>
      </div>
    </div>
  );
}
