import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { getAllProcess } from '~/src/app/features/dashboard/services';
import { diagramXML } from '~/src/app/features/diagramView/DiagramViewUtils';
import { icons } from '~/src/app/shared/components/TableList/TableListutils';
import { deleteProcess, getXMLByCommandId } from '~/src/app/shared/components/TableList/services';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';
import { useToast } from '~/src/app/shared/hooks/useToast';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { formatDate, formatModificationDate } from '~/src/app/shared/utils/dateUtils';

const THREE_HOURS = 3 * 60 * 60 * 1000; // 3 horas

export const useTableListController = () => {
  const { changeToastActive } = useToast();
  const { clearLocalDraft, updateLocalDraft } = useLocalBPMN();
  const { user } = useUserInfo();
  const { push } = useRouter();

  const [choisedListItem, setChoisedListItem] = useState<TTableListContent>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const changeModalState = () => setIsDeleteModalOpen((prev) => !prev);

  const getXml = useCallback(
    async (commandId: number) => {
      if (user?.clientId) {
        const xml = await getXMLByCommandId(user?.clientId, commandId);

        return xml;
      }
    },
    [user?.clientId]
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

  const showToast = useCallback(
    (state: 'success' | 'error', title: string, message: string) =>
      changeToastActive(
        {
          state
        },
        title,
        message,
        3000
      ),
    [changeToastActive]
  );

  const getProcess = useCallback(async () => {
    const userProcess = await getAllProcess(user?.clientId);

    return userProcess;
  }, [user?.clientId]);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: getProcess,
    mutationKey: 'userProcess',
    onSuccess() {
      const query = queryClient.getQueryData('userProcess');

      if (!query) return;

      const data = query as string;
      const parsedData = JSON.parse(data) as TTableListContent[];

      const filteredData = parsedData.filter(
        (item) => item.commandId !== choisedListItem?.commandId
      );
      const stringifiedData = JSON.stringify(filteredData);

      queryClient.setQueryData('userProcess', stringifiedData);
    }
  });

  const removeProcess = useCallback(async () => {
    if (user && choisedListItem) {
      const removedItemRes = await deleteProcess(
        user.clientId,
        user.userId,
        choisedListItem.commandId
      );

      if (removedItemRes === '"Base de dados atualizada com sucesso!"') {
        changeModalState();
        mutateAsync();
        return showToast(
          'success',
          'Sucesso',
          `O processo ${choisedListItem.commandName} foi deletado.`
        );
      }

      return showToast(
        'error',
        'Erro',
        `O processo ${choisedListItem.commandName} não pôde ser deletado.`
      );
    }
  }, [choisedListItem, mutateAsync, showToast, user]);

  const handleOpenDeleteModal = (listItem: TTableListContent) => {
    changeModalState();
    setChoisedListItem(listItem);
  };

  const deleteAction = async (listItem: TTableListContent) => {
    handleOpenDeleteModal(listItem);
  };

  const actions = icons(editAction, statisticAction, simulateAction, deleteAction);

  const createdAt = (date: string) => formatDate(new Date(date));

  const lastEdited = (date: string) => {
    const originalDate = new Date(date).getTime();
    const adjustedDate = isNaN(originalDate) ? null : new Date(originalDate - THREE_HOURS);
    return (adjustedDate && formatModificationDate(adjustedDate.toISOString(), true)) || '';
  };

  return {
    actions,
    choisedListItem,
    isDeleteModalOpen,
    createdAt,
    lastEdited,
    removeProcess,
    changeModalState
  };
};
