'use client';

import { Header as HeaderComponent } from '~/src/app/shared/components/header';
import { IoAdd, IoEyeOff, IoTrash } from 'react-icons/io5';

export function Header() {
  return (
    <HeaderComponent.body>
      <HeaderComponent.title>Processos</HeaderComponent.title>
      <HeaderComponent.content>
        <HeaderComponent.action
          size="small"
          variant="bordered"
          color="primary"
          actionLabel="Desativar"
          icon={IoEyeOff}
          onClick={() => console.log('Teste Header')}
        />
        <HeaderComponent.action
          size="small"
          variant="bordered"
          color="primary"
          actionLabel="Excluir"
          icon={IoTrash}
          onClick={() => console.log('Teste Header')}
        />
        <HeaderComponent.action
          size="small"
          color="white"
          actionLabel="Novo Processo"
          icon={IoAdd}
          onClick={() => console.log('Teste Header')}
        />
        <HeaderComponent.label>Olá, Cláudio!</HeaderComponent.label>
      </HeaderComponent.content>
    </HeaderComponent.body>
  );
}
