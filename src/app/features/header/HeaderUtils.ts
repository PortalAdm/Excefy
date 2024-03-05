import { MenuOptions } from '~/src/app/shared/components/Dropdown';
import { APP_ROUTES } from '~shared/utils/constants/app-routes';

export const dropdownOptions: MenuOptions[] = [
  {
    href: APP_ROUTES.private.agents.name,
    label: APP_ROUTES.private.agents.label
  }
];
