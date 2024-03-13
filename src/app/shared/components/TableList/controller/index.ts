import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { diagramXML } from '~/src/app/features/diagramView/DiagramViewUtils';
import { icons } from '~/src/app/shared/components/TableList/TableListutils';
import { getXMLByCommandId } from '~/src/app/shared/components/TableList/services';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { formatDate, formatModificationDate } from '~/src/app/shared/utils/dateUtils';

const THREE_HOURS = 3 * 60 * 60 * 1000; // 3 horas

export const TableListController = () => {
  const { clearLocalDraft, updateLocalDraft } = useLocalBPMN();
  const { user } = useUserInfo();
  const { push } = useRouter();

  const getXml = useCallback(
    async (commandId: number) => {
      if (user?.id) {
        const xml = await getXMLByCommandId(user?.id, commandId);

        return xml;
      }
    },
    [user?.id]
  );

  const editAction = async (listItem: TTableListContent) => {
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

  const createdAt = (date: string) => formatDate(new Date(date));

  const lastEdited = (date: string) => {
    const originalDate = new Date(date).getTime();
    const adjustedDate = isNaN(originalDate) ? null : new Date(originalDate - THREE_HOURS);
    return (adjustedDate && formatModificationDate(adjustedDate.toISOString(), true)) || '';
  };

  return { actions, createdAt, lastEdited };
};
