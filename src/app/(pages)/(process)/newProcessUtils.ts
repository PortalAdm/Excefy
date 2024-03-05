import { IoArrowBack } from 'react-icons/io5';
import { APP_ROUTES } from '../../shared/utils/constants/app-routes';
import { HeaderActionProps } from '~/src/app/features/header/views/HeaderAction';

export const action: HeaderActionProps = {
  actionLabel: 'Voltar',
  actionBackground: 'primary',
  color: 'white',
  icon: IoArrowBack,
  size: 'small',
  path: APP_ROUTES.private.dashboard.name
};
