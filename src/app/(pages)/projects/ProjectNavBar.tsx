'use client';

import { Header } from '~/src/app/features/header';
import { Dropdown } from '~/src/app/shared/components/Dropdown';
import { dropdownOptions } from '~/src/app/features/header/HeaderUtils';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { NewProjectModal } from './NewProjectModal';
import { useParams, usePathname } from 'next/navigation';
import { action } from './[projectId]/dashboard/dashboardUtils';
import { createNewDraftProcess } from '~/src/app/features/dashboard/services';
import { localStorage } from '~/src/app/shared/utils/constants/localStorage';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';

export function ProjectNavBar() {
  const pathname = usePathname();
  const projectId = useParams().projectId as string;

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const createDraft = useCallback(async () => {
    const stringifyUser = window?.localStorage.getItem(`Execfy:${localStorage.user}`);

    const user: AuthResponse = stringifyUser && JSON.parse(stringifyUser);

    if (user) {
      const draft = await createNewDraftProcess(user?.clientId, user.userId, projectId);

      if (draft?.commandId) {
        window?.localStorage.setItem(`Execfy:${localStorage.process.draft}`, JSON.stringify(draft));

        window.location.href = APP_ROUTES.private['new-process'].name;
      }
    }
  }, [projectId]);

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
            <Header.action {...action} onClick={() => createDraft()} />
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
