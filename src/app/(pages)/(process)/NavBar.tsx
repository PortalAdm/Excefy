'use client';

import { Header } from '~/src/app/features/header';
import { action } from './newProcessUtils';
import { Dropdown } from '~/src/app/shared/components/Dropdown';
import { dropdownOptions } from '~/src/app/features/header/HeaderUtils';

export const NavBar = () => (
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
