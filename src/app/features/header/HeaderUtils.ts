import { MenuOptions } from '../../shared/components/Dropdown/views/Dropdown';
import { APP_ROUTES } from '../../shared/utils/constants/app-routes';

export const dropdownOptions: MenuOptions[] = [
  {
    href: APP_ROUTES.private.agents.name,
    label: APP_ROUTES.private.agents.label
  }
];
