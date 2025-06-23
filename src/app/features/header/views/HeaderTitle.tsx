'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { PiPackage } from 'react-icons/pi';
import { useQuery } from 'react-query';
import { VariantProps } from 'tailwind-variants';
import { HeaderTitleRootTv, HeaderTitleTv } from '~/src/app/features/header/HeaderTV';
import { useHeaderController } from '~/src/app/features/header/controller';
import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';
import { getAllProjects } from '../../projects/services';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { useMemo } from 'react';
import { TbLoader2 } from 'react-icons/tb';

type HeaderTitleProps = VariantProps<typeof HeaderTitleTv>;

export function HeaderTitle({ position }: HeaderTitleProps) {
  const pathname = usePathname();
  const params = useParams();

  const { user } = useUserInfo();
  const { currentRoute } = useHeaderController();

  const { data: projects } = useQuery('userProjects', () => getAllProjects(user.clientId), {
    enabled: !!user,
    refetchOnWindowFocus: false
  });

  const selectedProject = useMemo(
    () => projects?.find((project) => project.projectId === Number(params.projectId as string)),
    [projects, params.projectId]
  );

  const titleSize: typeof position = currentRoute.subtitle ? 'subtitle' : 'label';

  return (
    <div className={HeaderTitleRootTv()}>
      {pathname.includes('dashboard') && (
        <div className="flex items-center gap-1.5">
          <Link href="/projects" className="flex items-center gap-1.5">
            <Title
              title={<PiPackage strokeWidth={3} className="mt-1" />}
              color="primary"
              size="lg"
              className={`${HeaderTitleTv({ position: titleSize })} w-fit`}
            />
            <Title
              title={currentRoute.label}
              color="primary"
              size="lg"
              className={HeaderTitleTv({ position: titleSize })}
            />
          </Link>

          <Title
            title=">"
            color="primary"
            size="lg"
            className={`${HeaderTitleTv({ position: titleSize })} w-fit`}
          />

          {selectedProject ? (
            <Title
              title={selectedProject?.projectName}
              color="primary"
              size="lg"
              className={`${HeaderTitleTv({ position: titleSize })} w-fit shrink-0`}
            />
          ) : (
            <TbLoader2 className="w-6 h-6 text-primary animate-spin" />
          )}
        </div>
      )}

      {!pathname.includes('dashboard') && (
        <div className="flex items-center gap-1.5">
          <Title
            title={<PiPackage strokeWidth={3} className="mt-1" />}
            color="primary"
            size="lg"
            className={`${HeaderTitleTv({ position: titleSize })} w-fit`}
          />
          <Title
            title={currentRoute.label}
            color="primary"
            size="lg"
            className={HeaderTitleTv({ position: titleSize })}
          />
        </div>
      )}

      {currentRoute.subtitle !== '' && (
        <Text text={currentRoute.subtitle} color="primary" size="lg" weigth="bold" />
      )}
    </div>
  );
}
