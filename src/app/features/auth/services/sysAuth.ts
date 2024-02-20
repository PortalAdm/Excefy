import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { CreateSession } from '~/src/app/shared/hooks/useCookie';
import { SYS_PASS, SYS_USERNAME } from '~/src/app/shared/utils/constants/authStorage';
import { sysSession } from '~/src/app/shared/utils/constants/sysSession';

export const sysAuth = async (
  loadAction: Dispatch<SetStateAction<boolean>>,
  createSession: ({ cookieName, value }: CreateSession) => void
) => {
  try {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const endpoint = '/token';
    loadAction(true);

    const body = {
      username: SYS_USERNAME,
      password: SYS_PASS,
      grant_type: 'password'
    };

    const { data } = await api.post(endpoint, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (data) {
      const createSessionCookie: CreateSession = {
        cookieName: sysSession,
        value: JSON.stringify(data)
      };

      return createSession(createSessionCookie);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  } finally {
    loadAction(false);
  }
};
