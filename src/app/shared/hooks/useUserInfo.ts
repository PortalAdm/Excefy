import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';
import { userSession } from '~/src/app/shared/utils/constants/userSession';

export const useUserInfo = () => {
  const { getLocalStorage } = useLocalStorage();

  const user: AuthResponse = getLocalStorage(userSession);

  return {
    user
  };
};
