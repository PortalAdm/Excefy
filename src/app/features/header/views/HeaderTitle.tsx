'use client';

import { VariantProps } from 'tailwind-variants';
import { HeaderTitleRootTv, HeaderTitleTv } from '~/src/app/features/header/HeaderTV';
import { useHeaderController } from '~/src/app/features/header/controller';
import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';

type HeaderTitleProps = VariantProps<typeof HeaderTitleTv>;

export function HeaderTitle({ position }: HeaderTitleProps) {
  const { currentRoute } = useHeaderController();

  const titleSIze: typeof position = currentRoute.subtitle ? 'subtitle' : 'label';

  return (
    <div className={HeaderTitleRootTv()}>
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
