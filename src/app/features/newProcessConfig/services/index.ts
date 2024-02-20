import { api } from '~/src/app/shared/services/axios/api';
import { recipient } from '~utils/constants/recipient';
import { ProcessConfigResponse } from '~/src/app/shared/types/responses/ProcessConfigResponse';
import { ProcessConfigRequest } from '~/src/app/shared/types/requests/ProcessConfigRequest';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';

export const updateProcessConfiguration = async (data: ProcessConfigRequest) => {
  try {
    const processConfig = {
      recipient,
      commandName: 'ProcessUpdate',
      commandParameters: [
        {
          name: 'clientId',
          value: '3'
        },
        {
          name: 'commandId',
          value: '21'
        },
        {
          name: 'processName',
          value: data.processName
        },
        {
          name: 'processDescription',
          value: data.processDescription
        },
        {
          name: 'matchPattern',
          value: '#testeUpdate%'
        },
        {
          name: 'executionPriority',
          value: '1'
        }
      ]
    };

    const result = await api.post<ProcessConfigResponse[]>(baseEndpoint, processConfig);

    return result.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('falha na atualização da configuração do processo', error);
  }
};
