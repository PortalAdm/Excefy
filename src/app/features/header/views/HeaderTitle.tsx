'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';
import { PiPackage } from 'react-icons/pi';
import { VariantProps } from 'tailwind-variants';
import { HeaderTitleRootTv, HeaderTitleTv } from '~/src/app/features/header/HeaderTV';
import { useHeaderController } from '~/src/app/features/header/controller';
import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';

type HeaderTitleProps = VariantProps<typeof HeaderTitleTv>;

export function HeaderTitle({ position }: HeaderTitleProps) {
  const pathname = usePathname();
  const params = useParams();
  const { currentRoute } = useHeaderController();

  const titleSIze: typeof position = currentRoute.subtitle ? 'subtitle' : 'label';

  return (
    <div className={HeaderTitleRootTv()}>
      {pathname.includes('dashboard') && (
        <div className="flex items-center gap-1.5">
          <Link href="/projects">
            <Title
              title={<IoMdArrowBack strokeWidth={3} className="mt-1 ml-1.5 " />}
              color="primary"
              size="md"
              className={`${HeaderTitleTv({ position: titleSIze })} w-fit`}
            />
          </Link>
          <Title
            title={params.projectId as string}
            color="primary"
            size="lg"
            className={`${HeaderTitleTv({ position: titleSIze })} w-fit shrink-0`}
          />
          <Title
            title=">"
            color="primary"
            size="lg"
            className={`${HeaderTitleTv({ position: titleSIze })} w-fit`}
          />
          <Title
            title="Processos"
            color="primary"
            size="lg"
            className={HeaderTitleTv({ position: titleSIze })}
          />
        </div>
      )}

      {!pathname.includes('dashboard') && (
        <div className="flex items-center gap-1.5">
          <Title
            title={<PiPackage strokeWidth={3} className="mt-1" />}
            color="primary"
            size="lg"
            className={`${HeaderTitleTv({ position: titleSIze })} w-fit`}
          />
          <Title
            title={currentRoute.label}
            color="primary"
            size="lg"
            className={HeaderTitleTv({ position: titleSIze })}
          />
        </div>
      )}

      {currentRoute.subtitle !== '' && (
        <Text text={currentRoute.subtitle} color="primary" size="lg" weigth="bold" />
      )}
    </div>
  );
}
