'use client';

import { Header } from '~/src/app/features/header';
import { Dropdown } from '~/src/app/shared/components/Dropdown';
import { dropdownOptions } from '~/src/app/features/header/HeaderUtils';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

export const NavBar = () => {
  const router = useRouter();

  return (
    <Header.root>
      <Header.title />
      <Header.content>
        <Header.action
          actionLabel="Voltar"
          actionBackground="primary"
          color="white"
          icon={IoArrowBack}
          size="small"
          onClick={() => router.push('/projects')}
        />
        <Header.divisor />
        <Header.label />
        <Dropdown options={dropdownOptions} />
      </Header.content>
    </Header.root>
  );
};
