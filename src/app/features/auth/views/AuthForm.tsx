'use client';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input } from '~shared/components/Input';
import { Text } from '~shared/components/Text';
import { Title } from '~shared/components/Title';
import { TAuthSubmitSchema, authSubmitSchema } from '../AuthUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './Form';
import { Button } from '~/src/app/shared/components/Button';
import { authFormTv } from '../AuthTV';
import { getToken } from '../services/GenerateToken';

interface AuthFormProps {
  handleForgetPassword: () => void;
}

export function AuthForm({ handleForgetPassword }: AuthFormProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleIconChange = () => setIsVisible((isVisible) => !isVisible);
  const inputIcon = isVisible ? AiFillEye : AiFillEyeInvisible;
  const passwordType = isVisible ? 'text' : 'password';

  const authFormSchema = useForm<TAuthSubmitSchema>({
    resolver: zodResolver(authSubmitSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = authFormSchema;

  const onSubmit = async (data: TAuthSubmitSchema) => {
    // eslint-disable-next-line no-console
    console.log('AUTENTICAÇÃO', data);
    await getToken(data.userName, data.password);
  };

  return (
    <FormProvider {...authFormSchema}>
      <Form onSubmit={handleSubmit(onSubmit)} className={authFormTv()}>
        <Title title="IALOGUE" size="xl" color="primary" />
        <Text
          text="Bem Vindo!"
          size="lg"
          color="primary"
          weigth="light"
          className="max-w-md leading-9"
        />

        <Input.root>
          <Input.label label="E-mail" name="userName" />
          <Input.field name="userName" placeholder="Digite seu usuário..." />
          <Input.error field="userName" />
        </Input.root>

        <Input.root>
          <Input.label label="Senha" name="password" />
          <Input.field type={passwordType} name="password" placeholder="Digite sua senha..." />
          <Input.icon icon={inputIcon} onClick={handleIconChange} input="right" />
          <Input.error field="password" />
        </Input.root>

        <Button.root disabled={isSubmitting} size="medium">
          <Button.contentWrapper>
            <Button.label text="Entrar" color="white" size="lg" weigth="bold" />
          </Button.contentWrapper>
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
