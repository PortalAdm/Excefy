import { AiOutlinePlus } from 'react-icons/ai';
import { HeaderActionProps } from '../../shared/components/header/views/HeaderAction';
import { createNewDraftProcess } from '~/src/app/features/dashboard/services';
import { localStorage } from '~/src/app/shared/utils/constants/localStorage';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

const createDraft = async () => {
  const draft = await createNewDraftProcess('3');

  if (draft?.commandId) {
    window?.localStorage.setItem(`Execfy:${localStorage.process.draft}`, JSON.stringify(draft));

    window.location.href = APP_ROUTES.private['new-process'].name;
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
