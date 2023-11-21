import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '../../../utils/constants/app-routes';
import { Text } from '../../Text';
import { Title } from '../../Title';

export function HeaderTitle() {
  const pathName = usePathname();
  const routeIndex = pathName.replace('/', '');

  const routeData = APP_ROUTES.private[routeIndex as keyof (typeof APP_ROUTES)['private']];
  const routeName = routeData?.label || '';
  const subtitleName = routeData?.subtitle;

  const formattedRouteName = routeName === 'Dashboard' ? 'Processos' : routeName;

  return (
    <div className="flex flex-col w-full relative">
      <Title
        title={formattedRouteName}
        color="primary"
        size="lg"
        className={`transition-all duration-700 ${
          subtitleName
            ? 'absolute scale-50 -top-5 -left-6'
            : 'scale-100 translate-y-0 -translate-x-0'
        }`}
      />
      {subtitleName !== '' && <Text text={subtitleName} color="primary" size="lg" weigth="bold" />}
    </div>
  );
}
