'use client';

import { FormItem, FormSchema } from '~/src/app/shared/types/FormItem';
import { FormPanel } from '../../../../FormPanel';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { queryClient } from '~/src/app/shared/services/reactQuery';
import { getAllProcess } from '~/src/app/features/dashboard/services';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { COPILOT_OBJECT_TYPE } from '~/src/app/features/copilot/constants';
import { TbLoader2 } from 'react-icons/tb';
import { useCallback } from 'react';
import { useToast } from '~/src/app/shared/hooks/useToast';
import { updateItem } from '~/src/app/features/diagramView/services';
import { getContentByCommandId } from '~/src/app/shared/components/TableList/services';

export default function EditFormPage() {
  const router = useRouter();

  const projectId = useParams().projectId as string;
  const formId = Number(useParams().formId as string);

  const { user } = useUserInfo();

  const { changeToastActive } = useToast();

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

  const { data: formItem, isLoading: isLoadingFormItem } = useQuery({
    queryKey: ['projects', projectId, 'forms', formId],
    queryFn: async () => {
      const [itemsStringified, formSchemaStringified] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: 'userProcess',
          queryFn: () => getAllProcess(user.clientId, projectId)
        }),
        queryClient.fetchQuery({
          queryKey: ['formContent', formId],
          queryFn: () => getContentByCommandId(user.clientId, formId)
        })
      ]);

      const items = JSON.parse(itemsStringified as unknown as string) as TTableListContent[];

      const item = items.find(
        (item) => item.commandId === formId && item.objectType === COPILOT_OBJECT_TYPE.FORM
      );

      if (!item) {
        throw new Error('Formulário não encontrado.');
      }

      const [{ model }] = JSON.parse(formSchemaStringified!) as { model: string }[];

      return {
        id: item.commandId,
        name: item.commandName,
        schema: JSON.parse(model) as FormSchema
      } as FormItem;
    },
    onError(error) {
      showToast('error', 'Ocorreu um erro ao buscar o formulário:', (error as Error).message);
      router.push(`/projects/${projectId}/dashboard`);
    },
    enabled: !!user?.clientId,
    refetchOnWindowFocus: false
  });

  function handleSave(formSchema: FormSchema) {
    updateItem(
      formSchema,
      {
        clientId: user?.clientId,
        userId: user?.userId,
        commandId: formId,
        objectType: COPILOT_OBJECT_TYPE.FORM
      },
      () => showToast('error', 'Ocorreu um erro ao atualizar o formulário', '')
    );
  }

  if (isLoadingFormItem || !formItem) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center animate-pulse">
        <TbLoader2 className="animate-spin w-10 h-10 text-primary/60" />
      </div>
    );
  }

  return <FormPanel name={formItem.name} item={formItem} onSave={handleSave} />;
}
