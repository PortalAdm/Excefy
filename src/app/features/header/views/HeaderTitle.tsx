'use client';

import { usePathname } from 'next/navigation';
import { VariantProps } from 'tailwind-variants';
import { HeaderTitleTv } from '~/src/app/features/header/HeaderTV';
import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

type HeaderTitleProps = VariantProps<typeof HeaderTitleTv>;

export function HeaderTitle({ position }: HeaderTitleProps) {
  const pathName = usePathname();
  const routeIndex = pathName.split('/')[1];
  const routes = Object.keys(APP_ROUTES.private);
  const findIndex = routes.find((key) => key.startsWith(routeIndex));
  const index = findIndex as keyof (typeof APP_ROUTES)['private'];
  const currentRoute = APP_ROUTES.private[index];

  const titleSIze: typeof position = currentRoute.subtitle ? 'subtitle' : 'label';

  return (
    <div className="flex flex-col w-full h-fit">
      <Title
        title={currentRoute.label}
        color="primary"
        size="lg"
        className={HeaderTitleTv({ position: titleSIze })}
      />
      {currentRoute.subtitle !== '' && (
        <Text text={currentRoute.subtitle} color="primary" size="lg" weigth="bold" />
      )}
    </div>
  );
}
