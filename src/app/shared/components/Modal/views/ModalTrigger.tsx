import { TRootComponent } from '~/src/app/shared/types';

interface ModalTriggerProps extends TRootComponent {
  changeModalState: () => void;
}

export function ModalTrigger({ children, changeModalState }: ModalTriggerProps) {
  return (
    <div id="Trigger" onClick={changeModalState}>
      {children}
    </div>
  );
}
