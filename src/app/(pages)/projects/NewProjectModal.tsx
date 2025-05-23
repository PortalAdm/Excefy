import { useCallback, useState } from 'react';
import { Modal } from '~/src/app/shared/components/Modal';
import { useToast } from '../../shared/hooks/useToast';
import { Input } from '../../shared/components/Input';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewProject } from '../../features/projects/services';
import { AuthResponse } from '../../shared/types/responses/AuthResponse';
import { localStorage } from '../../shared/utils/constants/localStorage';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  description: z.string().default('')
});

interface NewProjectModalProps {
  modalState: boolean;
  changeModalState: () => void;
}

export function NewProjectModal({ modalState, changeModalState }: NewProjectModalProps) {
  const { changeToastActive } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const [isCreating, setIsCreating] = useState(false);

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

  const handleCreateProject = form.handleSubmit(async (data: z.infer<typeof schema>) => {
    const { name, description } = data;

    try {
      setIsCreating(true);

      const stringifyUser = window?.localStorage.getItem(`Execfy:${localStorage.user}`);
      const user: AuthResponse = stringifyUser && JSON.parse(stringifyUser);

      const projectId = await createNewProject(user.clientId, user.userId, name, description);

      router.push(`/projects/${projectId as any}`);
    } catch (error) {
      showToast('error', 'Erro ao criar seu projeto', (error as Error).message);
    } finally {
      setIsCreating(false);
    }
  });

  return (
    <Modal.root modalState={modalState}>
      <Modal.content>
        <FormProvider {...form}>
          <form onSubmit={handleCreateProject} className="space-y-2" noValidate>
            <Modal.header changeModalState={changeModalState} title="Criar projeto" />
            <Modal.body>
              <Input.root className="!max-w-full">
                <Input.label label="Nome" name="name" />
                <Input.field name="name" placeholder="Digite o nome do projeto..." />
                <Input.error field="name" />
              </Input.root>

              <Input.root className="!max-w-full">
                <Input.label label="Descrição" name="description" />
                <Input.field
                  name="description"
                  placeholder="Digite uma descrição para o projeto..."
                />
                <Input.error field="description" />
              </Input.root>
            </Modal.body>
            <Modal.footer>
              <Modal.action
                type="button"
                size="small"
                actionLabel="Cancelar"
                color="primary"
                onClick={changeModalState}
                actionBackground="transparent"
                variant="bordered"
              />
              <Modal.action
                type="submit"
                disabled={isCreating}
                size="small"
                actionLabel="Criar projeto"
                color="white"
                actionBackground="primary"
              />
            </Modal.footer>
          </form>
        </FormProvider>
      </Modal.content>
    </Modal.root>
  );
}
