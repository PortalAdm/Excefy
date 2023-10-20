import { api } from '~/src/app/shared/services/axios/api';
import { AuthResponse } from '~/src/app/shared/types/AuthResponse';

export const getToken = async (username: string, password: string) => {
  try {
    await api
      .post<AuthResponse>('/token', {
        body: `grant_type=password&username=${username}&password=${password}`,
        headers: {
          'Content-Type': 'applica#on/x-www-form-urlencoded'
        }
      })
      .then((response) => console.log(response));
  } catch (err) {
    console.error(err);
  }
};
