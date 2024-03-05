import axios from 'axios';
import { TUserAuthRequest } from '~/src/app/shared/types/requests/TUserAuthRequest';
import { userSession } from '~/src/app/shared/utils/constants/userSession';

export const userAuth = async ({
  password,
  username,
  errorHandler,
  loadAction,
  sessionHandler
}: TUserAuthRequest) => {
  try {
    loadAction(true);

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const endpoint = '/token';
    const body = {
      grant_type: 'password',
      username: username,
      password: password
    };

    const { data } = await api.post(endpoint, body);

    if (data) {
      const accessToken = data.access_token;
      const userSessionValue = {
        id: data.clientId,
        _a: accessToken,
        username
      };

      sessionHandler(userSession, userSessionValue);
      return true;
    }

    errorHandler(`Usuário ou senha incorretos`);
    return false;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  } finally {
    loadAction(false);
  }
};
