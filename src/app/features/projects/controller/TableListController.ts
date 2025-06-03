import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { icons } from '~/src/app/shared/components/TableList/TableListutils';
import { deleteProject } from '~/src/app/shared/components/TableList/services';
import { useToast } from '~/src/app/shared/hooks/useToast';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { formatDate, formatModificationDate } from '~/src/app/shared/utils/dateUtils';
import { getAllProjects } from '../services';
import { Project } from '~/src/app/shared/types/Project';

const THREE_HOURS = 3 * 60 * 60 * 1000; // 3 horas

export const useTableListController = () => {
  const { changeToastActive } = useToast();
  const { user } = useUserInfo();

  const [choisedListItem, setChoisedListItem] = useState<Project>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const changeModalState = () => setIsDeleteModalOpen((prev) => !prev);

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

  const getProject = useCallback(async () => {
    const userProject = await getAllProjects(user?.clientId);

    return userProject;
  }, [user?.clientId]);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: getProject,
    mutationKey: 'userProject',
    onSuccess() {
      const query = queryClient.getQueryData('userProject');

      if (!query) return;

      const data = query as string;
      const parsedData = JSON.parse(data) as Project[];

      const filteredData = parsedData.filter(
        (item) => item.projectId !== choisedListItem?.projectId
      );
      const stringifiedData = JSON.stringify(filteredData);

      queryClient.setQueryData('userProject', stringifiedData);
    }
  });

  const removeProject = useCallback(async () => {
    if (user && choisedListItem) {
      const removedItemRes = await deleteProject(
        user.clientId,
        user.userId,
        choisedListItem.projectId
      );

      if (removedItemRes === '"Base de dados atualizada com sucesso!"') {
        changeModalState();
        mutateAsync();
        return showToast(
          'success',
          'Sucesso',
          `O projeto ${choisedListItem.projectName} foi deletado.`
        );
      }

      return showToast(
        'error',
        'Erro',
        `O projeto ${choisedListItem.projectName} não pôde ser deletado.`
      );
    }
  }, [choisedListItem, mutateAsync, showToast, user]);

  const deleteAction = async (project: Project | TTableListContent) => {
    setChoisedListItem(project as Project);
    changeModalState();
  };

  const actions = icons(undefined, undefined, undefined, deleteAction);

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
    removeProject,
    changeModalState
  };
};
