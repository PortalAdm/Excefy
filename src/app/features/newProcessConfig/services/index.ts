import { api } from '~/src/app/shared/services/axios/api';
import { recipient } from '~utils/constants/recipient';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { ProcessResponse } from '~/src/app/shared/types/responses/ProcessResponse';
import { TUpdateProcessConfigurationRequest } from '~/src/app/shared/types';

export const updateProcessConfiguration = async ({
  processDescription,
  processName,
  commandId,
  userId
}: TUpdateProcessConfigurationRequest) => {
  try {
    const processConfig = {
      recipient,
      commandName: 'ProcessUpdate',
      commandParameters: [
        {
          name: 'clientId',
          value: userId
        },
        {
          name: 'commandId',
          value: commandId
        },
        {
          name: 'processName',
          value: processName
        },
        {
          name: 'processDescription',
          value: processDescription
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

    const { data } = await api.post<ProcessResponse[]>(baseEndpoint, processConfig);

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('falha na atualização da configuração do processo', error);
  }
};
