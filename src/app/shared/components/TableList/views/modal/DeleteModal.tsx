import { Modal } from '~/src/app/shared/components/Modal';
import { Text } from '~/src/app/shared/components/Text';
import { Project } from '~/src/app/shared/types/Project';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';

interface DeleteModalProps<T extends 'dashboard' | 'project'> {
  type: T;
  modalState: boolean;
  listItem: T extends 'project' ? Project : TTableListContent;
  deleteItem: (listItem: T extends 'project' ? Project : TTableListContent) => Promise<void>;
  changeModalState: () => void;
}

export function DeleteModal<T extends 'dashboard' | 'project'>({
  type,
  deleteItem,
  changeModalState,
  listItem,
  modalState
}: DeleteModalProps<T>) {
  let disabled = false;

  const handleDelete = async () => {
    disabled = true;

    await deleteItem(listItem);

    disabled = false;
  };

  const handleCancelDelete = () => changeModalState();

  return (
    <Modal.root modalState={modalState}>
      <Modal.content>
        <Modal.header
          changeModalState={changeModalState}
          title={`Deletar o ${type === 'project' ? 'projeto' : 'processo'}`}
        />
        <Modal.body>
          <Text
            text={`Tem certeza que deseja deletar o ${type === 'project' ? 'projeto' : 'processo'}`}
            weigth="bold"
          />
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
