import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { userSession } from '~/src/app/shared/utils/constants/userSession';
import { capitalizeName } from '~/src/app/shared/utils/transformers';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

export const useHeaderController = () => {
  const { getLocalStorage } = useLocalStorage();
  const { push } = useRouter();

  const pushOrOnClick = (path?: string, onClick?: () => void) =>
    path ? push?.(path) : onClick?.();

  const userData = getLocalStorage(userSession);

  const username = capitalizeName(userData?.username) || '';

  const pathName = usePathname();
  const routeIndex = pathName.split('/')[1];
  const routes = Object.keys(APP_ROUTES.private);
  const findIndex = routes.find((key) => key.startsWith(routeIndex));
  const index = findIndex as keyof (typeof APP_ROUTES)['private'];
  const currentRoute = APP_ROUTES.private[index];

  return {
    username,
    currentRoute,
    pushOrOnClick
  };
};
