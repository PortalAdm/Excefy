/**
 * @function getToken autentica o usuário
 * @function getSystemToken autentica o sistema para ter acesso às requests
 */

import { SYS_AUTH_STORAGE_NAME } from '~/src/app/shared/utils/constants/authStorage';
import { useAuth } from '~/src/app/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';
import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { useCookie } from '~/src/app/shared/hooks/useCookie';
import { userSession } from '~/src/app/shared/utils/constants/userSession';
import { TAuthSubmitSchema, authSubmitSchema } from '~/src/app/features/auth/AuthUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { sysAuth } from '~/src/app/features/auth/services/sysAuth';
import { userAuth } from '~/src/app/features/auth/services/userAuth';

export const useAuthController = () => {
  const { deleteCookie, createSession } = useCookie();
  const { setLocalStorage, deleteFromStorage } = useLocalStorage();
  const { push } = useRouter();
  const { setIsLoading, setErrorMessage } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const handleIconChange = () => setIsVisible((isVisible) => !isVisible);
  const inputIcon = isVisible ? AiFillEye : AiFillEyeInvisible;
  const passwordType = isVisible ? 'text' : 'password';

  const authFormSchema = useForm<TAuthSubmitSchema>({
    resolver: zodResolver(authSubmitSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = authFormSchema;

  const onSubmit = async ({ password, userName }: TAuthSubmitSchema) => {
    const res = await userAuth({
      username: userName,
      password,
      loadAction: setIsLoading,
      sessionHandler: setLocalStorage,
      errorHandler: setErrorMessage
    });

    if (res) {
      await sysAuth(setIsLoading, createSession);
      push(APP_ROUTES.private.dashboard.name);
    }
  };

  const logout = () => {
    console.log('sai do LOCAL STORAGE', userSession);
    console.log('sai do COOKIE', SYS_AUTH_STORAGE_NAME);
    deleteCookie(SYS_AUTH_STORAGE_NAME);
    deleteFromStorage(userSession);
    return push(APP_ROUTES.public.home);
  };

  return {
    isSubmitting,
    authFormSchema,
    inputIcon,
    passwordType,
    logout,
    handleSubmit,
    onSubmit,
    handleIconChange
  };
};
