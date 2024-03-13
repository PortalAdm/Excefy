'use client';

import { labels } from '../DiagramViewUtils';

import { Modal } from '~shared/components/Modal';
import { Text } from '~shared/components/Text';
import CheckboxComp from '~shared/components/Checkbox';
import { DiagramDownload } from '~/src/app/shared/types/DiagramDownload';

export const DownloadModal = (
  modalState: boolean,
  value: DiagramDownload[],
  changeModalState: () => void,
  handleCheckboxChange: (checkboxValue: DiagramDownload) => void,
  downloading: () => void,
  handleCancelDownload: () => void
) => (
  <Modal.root modalState={modalState}>
    <Modal.content>
      <Modal.header changeModalState={changeModalState} title="Baixar" />
      <Modal.body>
        <Text text="Selecione o tipo de arquivo que deseja baixar" weigth="bold" />
        {labels.map((label, i) => (
          <CheckboxComp
            checked={value.includes(label.value[0])}
            key={i}
            onClick={() => handleCheckboxChange(label.value[0])}
            label={label.label}
            id={label.id}
          />
        ))}
      </Modal.body>
      <Modal.footer>
        <Modal.action
          size="small"
          actionLabel="cancelar"
          color="primary"
          onClick={handleCancelDownload}
          actionBackground="transparent"
          variant="bordered"
        />
        <Modal.action
          disabled={value.length === 0}
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
