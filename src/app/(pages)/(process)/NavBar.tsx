'use client';

import { Header } from '~/src/app/features/header';
import { action } from './newProcessUtils';
import { Dropdown } from '~/src/app/shared/components/Dropdown';
import { dropdownOptions } from '~/src/app/features/header/HeaderUtils';
import { useRouter } from 'next/navigation';
import { useLocalBPMN } from '../../shared/hooks/useLocalBPMN';

export const NavBar = () => {
  const router = useRouter();

  const {
    draft: { projectId }
  } = useLocalBPMN();

  return (
    <Header.root>
      <Header.title />
      <Header.content>
        <Header.action
          {...action}
          onClick={() => router.push(`/projects/${projectId}/dashboard`)}
        />
        <Header.divisor />
        <Header.label />
        <Dropdown options={dropdownOptions} />
      </Header.content>
    </Header.root>
  );
};
