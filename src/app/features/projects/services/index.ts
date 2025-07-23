import { api } from '~/src/app/shared/services/axios/api';
import { APIResponse } from '~/src/app/shared/types/APIResponse';
import { Project } from '~/src/app/shared/types/Project';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';
import { parseResponse } from '~/src/app/shared/utils/parseResponse';

export const getAllProjects = async (clientId: string) => {
  const { data } = await api.post<APIResponse>(baseEndpoint, {
    recipient,
    commandName: 'ProjectList',
    commandParameters: [
      {
        name: 'clientId',
        value: clientId
      }
    ]
  });

  return parseResponse(data) as Project[];
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
          name: 'createUserId',
          value: userId
        },
        {
          name: 'projectName',
          value: projectName
        },
        {
          name: 'projectDescription',
          value: projectDescription || ''
        }
      ]
    };

    const { data } = await api.post<APIResponse>(baseEndpoint, projectConfig);
    const [{ projectId }] = parseResponse(data) as { projectId: number }[];

    return projectId;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('falha na criação do novo projeto', error);
    }
  }
};
