'use client';

import { Header } from '~/src/app/features/header';
import { action } from './dashboardUtils';
import { Dropdown } from '~/src/app/shared/components/Dropdown';
import { dropdownOptions } from '~/src/app/features/header/HeaderUtils';

export function DashboardNavBar() {
  return (
    <Header.root>
      <Header.title />
      <Header.content>
        <Header.action {...action} />
        <Header.divisor />
        <Header.label />
        <Dropdown options={dropdownOptions} />
      </Header.content>
    </Header.root>
  );
}
