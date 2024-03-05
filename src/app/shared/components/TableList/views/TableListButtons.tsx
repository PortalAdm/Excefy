'use client';

import { Icon } from '~shared/components/Icon';
import { Tooltip } from '~shared/components/Tooltip';
import { tableListButtonsTv } from '../TableListTV';
import { icons } from '../TableListutils';
import { useRouter } from 'next/navigation';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { useDashboardController } from '~/src/app/features/dashboard/controller';
import { diagramXML } from '~/src/app/features/diagramView/DiagramViewUtils';

interface TableListButtonPtops {
  listItem: TTableListContent;
}

export function TableListButtons({ listItem }: TableListButtonPtops) {
  const { clearLocalDraft, updateLocalDraft } = useLocalBPMN();
  const { getXml } = useDashboardController();
  const { push } = useRouter();

  const editAction = async () => {
    const xml = await getXml(listItem.commandId);

    if (xml) {
      clearLocalDraft();
      updateLocalDraft({
        commandName: listItem.commandName,
        commandId: listItem.commandId,
        id: listItem.id,
        xml: JSON.parse(xml) || diagramXML,
        processDescription: listItem.commandDescription,
        isEdditing: true,
        createdAt: listItem.createdAt || ''
      });
      push(`${APP_ROUTES.private['edit-process'].name}${listItem.commandId}`);
    }
  };

  const statisticAction = () => {};
  const simulateAction = () => {};
  const deleteAction = () => {};

  const actions = icons(editAction, statisticAction, simulateAction, deleteAction);

  return (
    <div className={tableListButtonsTv()}>
      {actions.map((icon, i) => (
        <Tooltip key={i} text={icon.name}>
          <Icon icon={icon.element} onClick={icon.onClick} />
        </Tooltip>
      ))}
    </div>
  );
}
