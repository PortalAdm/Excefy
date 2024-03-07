'use client';

import { labels } from '../DiagramViewUtils';
import BpmnViewer from 'bpmn-js/lib/Modeler';

import { Modal } from '~shared/components/Modal';
import { Text } from '~shared/components/Text';
import { useModal } from '~shared/hooks/useModal';
import { DiagramDownload } from '~shared/types/DiagramDownload';
import { useBPMN } from '~shared/hooks/useBPMN';
import CheckboxComp from '~shared/components/Checkbox';
import { useState } from 'react';

export const DownloadModal = (viewer: BpmnViewer) => {
  const [value, setValue] = useState<DiagramDownload[]>([]);

  const { changeModalState } = useModal();
  const { downloadBPMNDiagram, downloadSVGiagram } = useBPMN();

  const handleCheckboxChange = (checkboxValue: DiagramDownload) => {
    const valueIndex = value.findIndex((item) => item === checkboxValue);

    if (valueIndex === -1) {
      setValue([...value, checkboxValue]);
    } else {
      const updatedValue = [...value];
      updatedValue.splice(valueIndex, 1);
      setValue(updatedValue);
    }
  };

  const handleCancelDownload = () => {
    changeModalState();
    setValue([]);
  };

  const downloading = () => {
    value.forEach((value) =>
      value === 'bpmn' ? downloadBPMNDiagram(viewer) : downloadSVGiagram(viewer)
    );

    setValue([]);
    changeModalState();
  };

  return (
    <Modal.root>
      <Modal.content>
        <Modal.header title="Baixar" />
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
};
