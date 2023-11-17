'use client';

import { Toast as ToastComp } from '~shared/components/toast';
import { useToast } from '~shared/hooks/useToast';

export function Toast() {
  const { changeToastActive } = useToast();

  return (
    <ToastComp.root>
      <ToastComp.header onClick={changeToastActive} />
      <ToastComp.info text="Exemplo de texto para recuperação.." />
    </ToastComp.root>
  );
}
