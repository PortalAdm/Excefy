import { LiaRobotSolid } from 'react-icons/lia';
import { PiGitBranchDuotone } from 'react-icons/pi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MenuItemsType } from '~shared/types';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

export const mockedMenuItems: MenuItemsType[] = [
  {
    icon: PiGitBranchDuotone,
    name: 'Processos',
    navigateTo: APP_ROUTES.private.dashboard.name
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
