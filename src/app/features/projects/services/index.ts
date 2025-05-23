import { api } from '~/src/app/shared/services/axios/api';
import {
  TBPMNDraft,
  TProcessInsertContent,
  TProcessInsertContentResponse
} from '~/src/app/shared/types';
import { Message } from '~/src/app/shared/types/Process';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';

export const getAllProjects = async (clientId: string) => {
  // const { data } = await api.post<Message[]>(baseEndpoint, {
  //   recipient,
  //   commandName: 'ProjectSelect',
  //   commandParameters: [
  //     {
  //       name: 'clientId',
  //       value: clientId
  //     }
  //   ]
  // });

  // return data?.[0].content;

  const data = [
    {
      content: JSON.stringify([
        {
          commandId: 1,
          commandName: 'Projeto 1',
          commandDescription: 'Descrição simples',
          createdAt: new Date(),
          lastEdited: new Date()
        },
        {
          commandId: 2,
          commandName: 'Projeto 2',
          commandDescription: 'Descrição simples 2',
          createdAt: new Date(),
          lastEdited: new Date()
        },
        {
          commandId: 3,
          commandName: 'Projeto 3',
          commandDescription: '',
          createdAt: new Date(),
          lastEdited: new Date()
        },
        {
          commandId: 4,
          commandName: 'Projeto 4',
          commandDescription: '',
          createdAt: new Date(),
          lastEdited: new Date()
        }
      ])
    }
  ];

  return data[0].content;
};

export const createNewProject = async (
  clientId: string,
  userId: string,
  projectName: string,
  projectDescription?: string
) => {
  try {
    const projectConfig = {
      recipient,
      commandName: 'ProjectInsert',
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
          name: 'projectName',
          value: projectName
        },
        {
          name: 'projectDescription',
          value: projectDescription || ''
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

    const { data } = await api.post<TProcessInsertContentResponse[]>(baseEndpoint, projectConfig);

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
      throw new Error('falha na criação do novo projeto', error);
    }
  }
};
