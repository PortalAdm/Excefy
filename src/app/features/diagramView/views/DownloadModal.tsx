'use client';

import CheckboxComp from '~/src/app/shared/components/Checkbox';
import { Modal } from '~/src/app/shared/components/Modal';
import { Text } from '~/src/app/shared/components/Text';
import { useModal } from '~/src/app/shared/hooks/useModal';
import { labels } from '../DiagramViewUtils';
import { useToast } from '~/src/app/shared/hooks/useToast';

export const DownloadModal = () => {
  const { changeToastActive } = useToast();
  const { changeModalState } = useModal();

  const downloading = () => {
    changeModalState();
    changeToastActive(
      { state: 'success' },
      'Mensagem de sucesso...',
      'essa mensagem durará 5s se não for fechada manualmente',
      5000
    );
  };

  return (
    <Modal.root>
      <Modal.content>
        <Modal.header title="Baixar" />
        <Modal.body>
          <Text text="Selecione o tipo de arquivo que deseja baixar" weigth="bold" />
          {labels.map((label, i) => (
            <CheckboxComp key={i} label={label.label} id={label.id} />
          ))}
        </Modal.body>
        <Modal.footer>
          <Modal.action
            size="small"
            actionLabel="cancelar"
            color="primary"
            onClick={downloading}
            actionBackground="transparent"
            variant="bordered"
          />
          <Modal.action
            size="small"
            actionLabel="Baixar"
            color="white"
            onClick={downloading}
            actionBackground="primary"
          />
        </Modal.footer>
      </Modal.content>
    </Modal.root>
  );
};
