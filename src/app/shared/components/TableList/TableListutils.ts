import { FiEdit2 } from 'react-icons/fi';
import { TbChartInfographic } from 'react-icons/tb';
import { IoPlaySkipForwardOutline } from 'react-icons/io5';
import { BiTrash } from 'react-icons/bi';

export const icons = [
  {
    element: FiEdit2,
    name: 'Editar',
    onClick: () => console.log('Editar') // criar a função dentro deste arquivo e chamar aqui
  },
  {
    element: TbChartInfographic,
    name: 'Estatísticas',
    onClick: () => console.log('Estatísticas') // criar a função dentro deste arquivo e chamar aqui
  },
  {
    element: IoPlaySkipForwardOutline,
    name: 'Simular',
    onClick: () => console.log('Simular') // criar a função dentro deste arquivo e chamar aqui
  },
  {
    element: BiTrash,
    name: 'Excluir',
    onClick: () => console.log('EdiExcluirtar') // criar a função dentro deste arquivo e chamar aqui
  }
];
