import { Modal } from '~/src/app/shared/components/Modal';
import { Text } from '~/src/app/shared/components/Text';
import { useModal } from '~/src/app/shared/hooks/useModal';
import { BiTrash } from 'react-icons/bi';

export const ClearModal = () => {
  const { changeModalState } = useModal();

  const clearning = () => {
    changeModalState();
  };

  return (
    <Modal.root>
      <Modal.content>
        <Modal.body>
          <Text
            text="Tem certeza que deseja descartar as alterações feitas no diagrama atual?"
            weigth="bold"
          />
          <Text text="Você perderá todo o progresso não salvo" />
        </Modal.body>
        <Modal.footer>
          <Modal.action
            size="small"
            actionLabel="cancelar"
            color="primary"
            onClick={clearning}
            actionBackground="transparent"
            variant="bordered"
          />
          <Modal.action
            icon={BiTrash}
            size="small"
            actionLabel="Limpar"
            color="white"
            onClick={clearning}
            actionBackground="primary"
          />
        </Modal.footer>
      </Modal.content>
    </Modal.root>
  );
};
