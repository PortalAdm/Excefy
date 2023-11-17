import { AiOutlinePlus } from 'react-icons/ai';
import { HeaderActionProps } from '../shared/components/header/views/HeaderAction';
import { APP_ROUTES } from '../shared/utils/constants/app-routes';

export const actions: HeaderActionProps[] = [
  {
    actionLabel: 'Novo processo',
    actionBackground: 'primary',
    color: 'white',
    icon: AiOutlinePlus,
    size: 'small',
    path: APP_ROUTES.private['new-process'].name
  }
];
