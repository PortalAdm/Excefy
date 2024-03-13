import { api } from '~/src/app/shared/services/axios/api';
import { TProcessInsertContentResponse } from '~/src/app/shared/types';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';

export const getXMLByCommandId = async (
  clientId: string,
  commandId: number
): Promise<string | undefined> => {
  try {
    const processConfig = {
      recipient,
      commandName: 'ModelProcessSelect',
      commandParameters: [
        {
          name: 'clientId',
          value: clientId
        },
        {
          name: 'commandId',
          value: commandId
        }
      ]
    };
    const { data } = await api.post<TProcessInsertContentResponse[]>(baseEndpoint, processConfig);

    return data[0].content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Falha ao buscar o xml do usuário', error);
    }
  }
};
