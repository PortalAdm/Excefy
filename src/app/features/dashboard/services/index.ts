import { api } from '~/src/app/shared/services/axios/api';
import { Message } from '~/src/app/shared/types/Process';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';

export const getAllProcess = async () => {
  const { data } = await api.post<Message[]>(baseEndpoint, {
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
