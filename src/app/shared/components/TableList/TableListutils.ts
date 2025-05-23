import { FiEdit2 } from 'react-icons/fi';
import { TbChartInfographic } from 'react-icons/tb';
import { IoPlaySkipForwardOutline } from 'react-icons/io5';
import { BiTrash } from 'react-icons/bi';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { IconType } from 'react-icons/lib';

export const icons = (
  editAction?: (listItem: TTableListContent) => void,
  statisticAction?: () => void,
  simulateAction?: () => void,
  deleteAction?: (listItem: TTableListContent) => void
) => {
  const icons: {
    element: IconType;
    name: string;
    onClick: ((listItem: TTableListContent) => void) | undefined;
  }[] = [];

  if (editAction)
    icons.push({
      element: FiEdit2,
      name: 'Editar',
      onClick: editAction
    });

  if (statisticAction)
    icons.push({
      element: TbChartInfographic,
      name: 'Estatísticas',
      onClick: () => statisticAction()
    });

  if (simulateAction)
    icons.push({
      element: IoPlaySkipForwardOutline,
      name: 'Simular',
      onClick: () => simulateAction()
    });

  if (deleteAction)
    icons.push({
      element: BiTrash,
      name: 'Excluir',
      onClick: deleteAction
    });

  return icons;
};
