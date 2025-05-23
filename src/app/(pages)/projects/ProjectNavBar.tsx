'use client';

import { Header } from '~/src/app/features/header';
import { Dropdown } from '~/src/app/shared/components/Dropdown';
import { dropdownOptions } from '~/src/app/features/header/HeaderUtils';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { NewProjectModal } from './NewProjectModal';
import { usePathname } from 'next/navigation';
import { action } from './[projectId]/dashboard/dashboardUtils';

export function ProjectNavBar() {
  const pathname = usePathname();

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  return (
    <>
      <NewProjectModal
        modalState={isCreateProjectModalOpen}
        changeModalState={() => setIsCreateProjectModalOpen((prevState) => !prevState)}
      />

      <Header.root>
        <Header.title />
        <Header.content>
          {pathname.includes('dashboard') ? (
            <Header.action {...action} />
          ) : (
            <Header.action
              actionLabel="Novo projeto"
              actionBackground="primary"
              color="white"
              icon={AiOutlinePlus}
              size="small"
              onClick={() => setIsCreateProjectModalOpen(true)}
            />
          )}
          <Header.divisor />
          <Header.label />
          <Dropdown options={dropdownOptions} />
        </Header.content>
      </Header.root>
    </>
  );
}
