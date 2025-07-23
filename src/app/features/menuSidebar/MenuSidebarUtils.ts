import { LiaRobotSolid } from 'react-icons/lia';
import { PiPackage } from 'react-icons/pi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MenuItemsType } from '~shared/types';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

export const menuItems: MenuItemsType[] = [
  {
    icon: PiPackage,
    name: 'Projetos',
    navigateTo: APP_ROUTES.private.projects.name
  },
  {
    icon: LiaRobotSolid,
    name: 'Agentes',
    navigateTo: APP_ROUTES.private.agents.name
  },
  {
    icon: AiOutlineSchedule,
    name: 'Agenda',
    navigateTo: APP_ROUTES.private.schedule.name
  }
];
