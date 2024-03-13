'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MenuSidebar } from '~/src/app/features/menuSidebar';
import Logo from '~assets/images/logo/execfy 1.png';

export function Menu() {
  const [isClose, setIsClose] = useState(false);

  const changeMenuState = () => setIsClose((isClose) => !isClose);

  const pathName = usePathname();

  if (pathName === '/') return null;

  return (
    <MenuSidebar.root isClose={isClose}>
      <div className="flex justify-between items-center">
        <MenuSidebar.hamburguer onClick={changeMenuState} isClose={isClose} />
        {isClose && <MenuSidebar.logo src={Logo} onClick={changeMenuState} />}
      </div>
      <MenuSidebar.divider />
      <MenuSidebar.items isClose={isClose} />
    </MenuSidebar.root>
  );
}
