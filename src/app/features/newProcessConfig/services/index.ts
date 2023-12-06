import { api } from '~/src/app/shared/services/axios/api';
import { recipient } from '~utils/constants/recipient';
import { ProcessConfigResponse } from '~types/ProcessConfigResponse';
import { ProcessConfigRequest } from '~types/ProcessConfigRequest';

export const updateProcessConfiguration = async (data: ProcessConfigRequest) => {
  try {
    const endpoint = 'message/process/';

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

    const result = await api.post<ProcessConfigResponse[]>(endpoint, processConfig);

    return result.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('falha na atualização da configuração do processo', error);
  }
};
