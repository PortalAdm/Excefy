import { FiEdit2 } from 'react-icons/fi';
import { TbChartInfographic } from 'react-icons/tb';
import { IoPlaySkipForwardOutline } from 'react-icons/io5';
import { BiTrash } from 'react-icons/bi';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';

export const icons = (
  editAction: (listItem: TTableListContent) => void,
  statisticAction: () => void,
  simulateAction: () => void,
  deleteAction: (listItem: TTableListContent) => void
) => [
  {
    element: FiEdit2,
    name: 'Editar',
    onClick: editAction
  },
  {
    element: TbChartInfographic,
    name: 'Estatísticas',
    onClick: () => statisticAction()
  },
  {
    element: IoPlaySkipForwardOutline,
    name: 'Simular',
    onClick: () => simulateAction()
  },
  {
    element: BiTrash,
    name: 'Excluir',
    onClick: deleteAction
  }
];
