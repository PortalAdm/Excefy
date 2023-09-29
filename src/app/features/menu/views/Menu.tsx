'use client';

import { BsSearch } from 'react-icons/bs';
import { LiaRobotSolid } from 'react-icons/lia';
import { PiGitBranchDuotone } from 'react-icons/pi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MenuSidebar } from '~shared/components/menuSidebar';
import { MenuItemsType } from '~shared/types';

const mockedMenuItems: MenuItemsType[] = [
  // isso deverá vir da api
  {
    icon: PiGitBranchDuotone,
    name: 'Processos',
    navigateTo: '/dashboard'
  },
  {
    icon: LiaRobotSolid,
    name: 'Agentes',
    navigateTo: '/agents'
  },
  {
    icon: AiOutlineSchedule,
    name: 'Agenda',
    navigateTo: '/schedule'
  }
];

export function Menu() {
  const [isClose, setIsClose] = useState(false);

  const changeMenuState = () => setIsClose((isClose) => !isClose);

  const pathName = usePathname();

  if (pathName === '/') return null;

  return (
    <MenuSidebar.root isClose={isClose}>
      <MenuSidebar.hamburguer onClick={changeMenuState} isClose={isClose} />
      <MenuSidebar.search onClick={changeMenuState} isClose={isClose} icon={BsSearch} />
      <MenuSidebar.items onClick={changeMenuState} isClose={isClose} data={mockedMenuItems} />
    </MenuSidebar.root>
  );
}
