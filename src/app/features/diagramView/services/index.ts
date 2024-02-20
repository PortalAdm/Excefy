import { api } from '~/src/app/shared/services/axios/api';
import { TUpdateProcessRequest } from '~/src/app/shared/types/requests/TUpdateProcessRequest';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';

export const updateProcess = async (xml: string) => {
  const body: TUpdateProcessRequest = {
    commandName: 'UpdateModelProcess',
    recipient,
    commandParameters: [
      {
        name: 'clientId',
        value: '3'
      },
      {
        name: 'commandId',
        value: '19'
      },
      {
        name: 'xml',
        value: xml
      }
    ]
  };

  const { data } = await api.post(baseEndpoint, body);

  console.log(data);
};
