import { api } from '~/src/app/shared/services/axios/api';
import {
  TBPMNDraft,
  TProcessInsertContent,
  TProcessInsertContentResponse
} from '~/src/app/shared/types';
import { Message } from '~/src/app/shared/types/Process';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';

export const getAllProcess = async (clientId: string) => {
  const { data } = await api.post<Message[]>(baseEndpoint, {
    recipient,
    commandName: 'ProcessSelect',
    commandParameters: [
      {
        name: 'clientId',
        value: clientId
      }
    ]
  });

  return data?.[0].content;
};

export const createNewDraftProcess = async (clientId: string, userId: string) => {
  try {
    const processConfig = {
      recipient,
      commandName: 'ProcessInsert',
      commandParameters: [
        {
          name: 'clientId',
          value: clientId
        },
        {
          name: 'userId',
          value: userId
        },
        {
          name: 'processName',
          value: ''
        },
        {
          name: 'processDescription',
          value: ''
        },
        {
          name: 'matchPattern',
          value: ''
        },
        {
          name: 'executionPriority',
          value: '1'
        }
      ]
    };

    const { data } = await api.post<TProcessInsertContentResponse[]>(baseEndpoint, processConfig);

    if (data) {
      const parsedContent: TProcessInsertContent[] = JSON.parse(data?.[0].content);

      const draft: TBPMNDraft = {
        id: data?.[0].id,
        commandId: parsedContent[0].commandId,
        commandName: parsedContent[0].commandName,
        xml: '',
        isEdditing: false
      };

      return draft;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('falha na criação do novo processo', error);
    }
  }
};
