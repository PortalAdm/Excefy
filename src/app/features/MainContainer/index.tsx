'use client';

import { mainContainerTv } from '~/src/app/features/MainContainer/MainContainerTV';
import { useMainContainerController } from '~/src/app/features/MainContainer/controller';
import { TRootComponent } from '~/src/app/shared/types';

export function MainContainer({ children }: TRootComponent) {
  const { isClientSide, isDarkMode, flexDirection } = useMainContainerController();

  return (
    <main className={mainContainerTv({ 'flex-direction': flexDirection, theme: isDarkMode })}>
      {isClientSide && children}
    </main>
  );
}
