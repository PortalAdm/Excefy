import { Modal } from '~/src/app/shared/components/Modal';
import { Text } from '~/src/app/shared/components/Text';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';

interface DeleteProcessModalProps {
  modalState: boolean;
  listItem: TTableListContent;
  deleteProcess: (listItem: TTableListContent) => Promise<void>;
  changeModalState: () => void;
}

export function DeleteProcessModal({
  deleteProcess,
  changeModalState,
  listItem,
  modalState
}: DeleteProcessModalProps) {
  let disabled = false;

  const handleDelete = async () => {
    disabled = true;

    await deleteProcess(listItem);

    disabled = false;
  };

  const handleCancelDelete = () => changeModalState();

  return (
    <Modal.root modalState={modalState}>
      <Modal.content>
        <Modal.header changeModalState={changeModalState} title="Deletar o processo" />
        <Modal.body>
          <Text text="Tem certeza que deseja deletar o processo?" weigth="bold" />
        </Modal.body>
        <Modal.footer>
          <Modal.action
            size="small"
            actionLabel="Não, cancelar"
            color="primary"
            onClick={handleCancelDelete}
            actionBackground="transparent"
            variant="bordered"
          />
          <Modal.action
            disabled={disabled}
            size="small"
            actionLabel="Sim, deletar"
            color="white"
            onClick={handleDelete}
            actionBackground="primary"
          />
        </Modal.footer>
      </Modal.content>
    </Modal.root>
  );
}
