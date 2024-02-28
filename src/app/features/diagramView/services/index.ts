import { api } from '~/src/app/shared/services/axios/api';
import { TUpdateProcessRequest } from '~/src/app/shared/types/requests/TUpdateProcessRequest';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';

export const updateProcess = async (
  xml: string,
  userId: string,
  commandId: number,
  errorHandler: () => void
): Promise<string | undefined> => {
  try {
    const body: TUpdateProcessRequest = {
      commandName: 'UpdateModelProcess',
      recipient,
      commandParameters: [
        {
          name: 'clientId',
          // value: userId
          value: '3'
        },
        {
          name: 'commandId',
          value: commandId
        },
        {
          name: 'xml',
          value: xml
        }
      ]
    };

    const { data } = await api.post(baseEndpoint, body);

    if (data) {
      return data?.[0].dispatch;
    }
  } catch (err) {
    errorHandler();
    if (err instanceof Error) throw new Error('Falha na atualização do Processo', err);
  }
};
