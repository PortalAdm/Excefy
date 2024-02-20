import { api } from '~/src/app/shared/services/axios/api';
import { Message } from '~/src/app/shared/types/Process';
import { recipient } from '~/src/app/shared/utils/constants/recipient';

export const getAllProcess = async () => {
  const endpoint = 'message/process/';

  const { data } = await api.post<Message[]>(endpoint, {
    recipient,
    commandName: 'ProcessSelect',
    commandParameters: [
      {
        name: 'clientId',
        value: '3'
      }
    ]
  });

  return data;
};
