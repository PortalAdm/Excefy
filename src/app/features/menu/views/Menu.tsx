'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MenuSidebar } from '~shared/components/menuSidebar';
import { mockedMenuItems } from '../menuUtils';
import { menuHeaderTv } from '../MenuTV';
import Logo from '~assets/images/logo/execfy 1.png';

export function Menu() {
  const [isClose, setIsClose] = useState(false);

  const changeMenuState = () => setIsClose((isClose) => !isClose);

  const pathName = usePathname();

  if (pathName === '/') return null;

  return (
    <MenuSidebar.root isClose={isClose}>
      <div className={menuHeaderTv()}>
        <MenuSidebar.hamburguer onClick={changeMenuState} isClose={isClose} />
        {isClose && <MenuSidebar.logo src={Logo} onClick={changeMenuState} />}
      </div>
      <MenuSidebar.divider />
      <MenuSidebar.items onClick={changeMenuState} isClose={isClose} data={mockedMenuItems} />
    </MenuSidebar.root>
  );
}
