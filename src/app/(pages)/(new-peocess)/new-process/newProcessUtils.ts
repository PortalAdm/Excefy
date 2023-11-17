import { IoArrowBack } from 'react-icons/io5';
import { HeaderActionProps } from '../../../shared/components/header/views/HeaderAction';
import { APP_ROUTES } from '../../../shared/utils/constants/app-routes';

export const actions: HeaderActionProps[] = [
  {
    actionLabel: 'Voltar',
    actionBackground: 'primary',
    color: 'white',
    icon: IoArrowBack,
    size: 'small',
    path: APP_ROUTES.private.dashboard.name
  }
];
