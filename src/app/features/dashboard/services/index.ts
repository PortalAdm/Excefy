import { api } from '~/src/app/shared/services/axios/api';
import { Message } from '~/src/app/shared/types/Process';
import { getSystemToken } from '~/src/app/shared/utils/constants/getSystemToken';

export const getAllProcess = async () => {
  try {
    const sysToken = getSystemToken();

    if (!sysToken) return;

    const endpoint = '/message/process/';

    const recipient = process.env.NEXT_PUBLIC_RECIPIENT!;

    const resault = await api.post<Message>(endpoint, {
      recipient,
      commandName: 'ProcessSelect',
      commandParameters: [
        {
          name: 'clientId',
          value: '3'
        }
      ]
    });

    return resault.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
