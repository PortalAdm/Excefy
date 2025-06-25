import { api } from '~/src/app/shared/services/axios/api';
import {
  TBPMNDraft,
  TProcessInsertContent,
  TProcessInsertContentResponse
} from '~/src/app/shared/types';
import { Message } from '~/src/app/shared/types/Process';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';
import { COPILOT_OBJECT_TYPE } from '../../copilot/constants';

export async function getAllProcess(clientId: string, projectId: string) {
  const { data } = await api.post<Message[]>(baseEndpoint, {
    recipient,
    commandName: 'ProjectProcessList',
    commandParameters: [
      {
        name: 'clientId',
        value: clientId
      },
      {
        name: 'projectId',
        value: projectId
      }
    ]
  });

  return data?.[0].content;
}

export async function createNewItem(
  clientId: string,
  userId: string,
  projectId: string,
  objectType: COPILOT_OBJECT_TYPE
) {
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
        },
        {
          name: 'objectType',
          value: String(objectType)
        }
      ]
    };

    const { data } = await api.post<TProcessInsertContentResponse[]>(baseEndpoint, processConfig);

    if (data) {
      const [{ commandId, commandName }]: TProcessInsertContent[] = JSON.parse(data?.[0].content);

      await api.post(baseEndpoint, {
        recipient,
        commandName: 'ProjectsProcessInsert',
        commandParameters: [
          {
            name: 'clientId',
            value: clientId
          },
          {
            name: 'projectId',
            value: projectId
          },
          {
            name: 'commandId',
            value: commandId
          }
        ]
      });

      const draft: TBPMNDraft = {
        projectId,
        id: data?.[0].id,
        commandId,
        commandName,
        xml: '',
        isEdditing: false
      };

      return draft;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('falha na criação do novo item:', error);
    }
  }
}
