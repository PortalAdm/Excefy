import { AiOutlinePlus } from 'react-icons/ai';
import { createNewDraftProcess } from '~/src/app/features/dashboard/services';
import { localStorage } from '~/src/app/shared/utils/constants/localStorage';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { HeaderActionProps } from '~/src/app/features/header/views/HeaderAction';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';

const createDraft = async () => {
  const stringifyUser = window?.localStorage.getItem(`Execfy:${localStorage.user}`);

  const user: AuthResponse = stringifyUser && JSON.parse(stringifyUser);

  if (user) {
    const draft = await createNewDraftProcess(user?.clientId, user.userId);

    if (draft?.commandId) {
      window?.localStorage.setItem(`Execfy:${localStorage.process.draft}`, JSON.stringify(draft));

      window.location.href = APP_ROUTES.private['new-process'].name;
    }
  }
};

export const action: HeaderActionProps = {
  actionLabel: 'Novo processo',
  actionBackground: 'primary',
  color: 'white',
  icon: AiOutlinePlus,
  size: 'small',
  onClick() {
    createDraft();
  }
};
