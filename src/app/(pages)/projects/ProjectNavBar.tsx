'use client';

import { Header } from '~/src/app/features/header';
import { Dropdown } from '~/src/app/shared/components/Dropdown';
import { dropdownOptions } from '~/src/app/features/header/HeaderUtils';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { NewProjectModal } from './NewProjectModal';
import { useParams, usePathname } from 'next/navigation';
import { createNewItem } from '~/src/app/features/dashboard/services';
import { localStorage } from '~/src/app/shared/utils/constants/localStorage';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { COPILOT_OBJECT_TYPE, ITEM_ICON } from '../../features/copilot/constants';
import { updateItem } from '../../features/diagramView/services';
import { EMPTY_FORM } from '../../features/form/constants';

export function ProjectNavBar() {
  const pathname = usePathname();
  const projectId = useParams().projectId as string;

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const createDraft = useCallback(async () => {
    const stringifyUser = window?.localStorage.getItem(`Execfy:${localStorage.user}`);

    const user: AuthResponse = stringifyUser && JSON.parse(stringifyUser);

    if (user) {
      const draft = await createNewItem(
        user?.clientId,
        user.userId,
        projectId,
        COPILOT_OBJECT_TYPE.PROCESS
      );

      if (draft?.commandId) {
        window?.localStorage.setItem(`Execfy:${localStorage.process.draft}`, JSON.stringify(draft));

        window.location.href = APP_ROUTES.private['new-process'].name;
      }
    }
  }, [projectId]);

  const createNewForm = useCallback(async () => {
    const stringifyUser = window?.localStorage.getItem(`Execfy:${localStorage.user}`);

    const user: AuthResponse = stringifyUser && JSON.parse(stringifyUser);

    if (user) {
      const form = await createNewItem(
        user.clientId,
        user.userId,
        projectId,
        COPILOT_OBJECT_TYPE.FORM
      );

      if (form) {
        await updateItem(
          EMPTY_FORM,
          {
            clientId: user.clientId,
            userId: user.userId,
            commandId: form.commandId,
            objectType: COPILOT_OBJECT_TYPE.FORM
          },
          () => {}
        );

        window.location.href = `/projects/${projectId}/edit-form/${form.commandId}`;
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
            <RadixDropdown.Root>
              <RadixDropdown.Trigger asChild>
                <Header.action
                  actionLabel="Novo"
                  actionBackground="primary"
                  color="white"
                  icon={AiOutlinePlus}
                  size="small"
                />
              </RadixDropdown.Trigger>

              <RadixDropdown.Content
                sideOffset={4}
                className="bg-white border z-50 border-primary shadow-lg rounded-md py-1 min-w-[var(--radix-dropdown-menu-trigger-width)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
              >
                <RadixDropdown.Item
                  onSelect={createDraft}
                  className="flex items-center gap-2 py-1.5 px-3.5 cursor-pointer outline-none focus-visible:bg-black/5 hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                  <ITEM_ICON.PROCESS />
                  <span>Processo</span>
                </RadixDropdown.Item>
                <RadixDropdown.Item
                  onSelect={createNewForm}
                  className="flex items-center gap-2 py-1.5 px-3.5 cursor-pointer outline-none focus-visible:bg-black/5 hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                  <ITEM_ICON.FORM />
                  <span>Formulário</span>
                </RadixDropdown.Item>
              </RadixDropdown.Content>
            </RadixDropdown.Root>
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
