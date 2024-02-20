'use client';

import { FormProvider } from 'react-hook-form';
import { Input } from '~shared/components/Input';
import { Text } from '~shared/components/Text';
import { Title } from '~shared/components/Title';
import { Form } from './Form';
import { Button } from '~/src/app/shared/components/Button';
import { authFormTv } from '../AuthTV';
import { ButtonLoad } from '~/src/app/shared/components/animations/buttonLoad';
import { useAuthController } from '../controller';
import { useAuth } from '~/src/app/shared/hooks/useAuth';

interface AuthFormProps {
  handleForgetPassword: () => void;
}

export function AuthForm({ handleForgetPassword }: AuthFormProps) {
  const { isLoading, errorMessage } = useAuth();
  const {
    isSubmitting,
    authFormSchema,
    inputIcon,
    passwordType,
    handleSubmit,
    onSubmit,
    handleIconChange
  } = useAuthController();

  return (
    <FormProvider {...authFormSchema}>
      <Form onSubmit={handleSubmit(onSubmit)} className={authFormTv()}>
        <Title title="EXECFY" size="xl" color="primary" />
        <Text
          text="Bem Vindo!"
          size="lg"
          color="primary"
          weigth="light"
          className="max-w-md leading-9"
        />

        {errorMessage && (
          <Text
            text={errorMessage}
            size="xs"
            color="error"
            weigth="light"
            className="max-w-md leading-9"
          />
        )}

        <Input.root>
          <Input.label label="Nome de Usuário" name="userName" />
          <Input.field name="userName" placeholder="Digite seu usuário..." />
          <Input.error field="userName" />
        </Input.root>

        <Input.root>
          <Input.label label="Senha" name="password" />
          <Input.wrapperWithIcon>
            <Input.field type={passwordType} name="password" placeholder="Digite sua senha..." />
            <Input.icon icon={inputIcon} onClick={handleIconChange} input="right" />
          </Input.wrapperWithIcon>
          <Input.error field="password" />
        </Input.root>

        <Button.root disabled={isSubmitting} size="medium">
          {isLoading ? (
            <ButtonLoad />
          ) : (
            <Button.contentWrapper>
              <Button.label text="Entrar" color="white" size="lg" weigth="bold" />
            </Button.contentWrapper>
          )}
        </Button.root>

        <Button.root onClick={handleForgetPassword} color="transparent" size="small" type="button">
          <Button.contentWrapper>
            <Button.label text="Esquceu sua senha?" size="sm" color="primary" />
          </Button.contentWrapper>
        </Button.root>
      </Form>
    </FormProvider>
  );
}
