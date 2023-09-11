import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '~shared/components/Input';
import { Text } from '~shared/components/Text';
import { Title } from '~shared/components/Title';
import { TRecoverySchema, recoverySchema } from '../AuthUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './Form';
import { Button } from '~/src/app/shared/components/Button';
import { authFormTv, recoveryButtonTv } from '../AuthTV';

interface RecoveryFormProps {
  handleForgetPassword: () => void;
}

export function RecoveryForm({ handleForgetPassword }: RecoveryFormProps) {
  const recoveryFormSchema = useForm<TRecoverySchema>({
    resolver: zodResolver(recoverySchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = recoveryFormSchema;

  const onRecovery = (data: TRecoverySchema) => {
    console.log('RECOVERY', data);
  };

  return (
    <FormProvider {...recoveryFormSchema}>
      <Form onSubmit={handleSubmit(onRecovery)} className={authFormTv()}>
        <Button.root
          onClick={handleForgetPassword}
          color="primary"
          size="small"
          type="button"
          className={recoveryButtonTv()}
        >
          <Button.contentWrapper>
            <Button.label text="Entrar" size="sm" color="white" />
          </Button.contentWrapper>
        </Button.root>

        <Title title="IALOGUE" size="xl" color="primary" />
        <Text
          text="Enviaremos um e-mail com instruções de como redefinir sua senha!"
          size="lg"
          color="primary"
          weigth="light"
          className="max-w-md leading-9"
        />

        <Input.root>
          <Input.label label="E-mail" name="email" />
          <Input.field name="email" placeholder="Digite seu email..." />
          <Input.error field="email" />
        </Input.root>

        <Button.root disabled={isSubmitting} size="medium">
          <Button.contentWrapper>
            <Button.label text="Solicitar" color="white" size="lg" weigth="bold" />
          </Button.contentWrapper>
        </Button.root>
      </Form>
    </FormProvider>
  );
}
