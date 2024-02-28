'use client';

import { usePathname } from 'next/navigation';
import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

export function HeaderTitle() {
  const { draft } = useLocalBPMN();
  const pathName = usePathname();
  const routeIndex = pathName.split('/')[1];

  const routeData = APP_ROUTES.private[routeIndex as keyof (typeof APP_ROUTES)['private']];
  const routeLabel = routeData?.label || '';
  const subtitleName = routeData?.subtitle;

  if (routeData?.subtitle) {
    draft?.isEdditing
      ? (routeData.subtitle = 'Editando Processo')
      : (routeData.subtitle = 'Novo Processo');
  }

  return (
    <div className="flex flex-col w-full h-fit">
      <Title
        title={routeLabel}
        color="primary"
        size="lg"
        className={`transition-all w-full duration-700 ${
          subtitleName ? 'text-xs' : 'scale-100 translate-y-0 -translate-x-0'
        }`}
      />
      {subtitleName !== '' && <Text text={subtitleName} color="primary" size="lg" weigth="bold" />}
    </div>
  );
}
