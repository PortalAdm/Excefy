import { api } from '~/src/app/shared/services/axios/api';
import { TRunProcessRequest } from '~/src/app/shared/types/requests/TRunProcessRequest';
import { TUpdateProcessRequest } from '~/src/app/shared/types/requests/TUpdateProcessRequest';
import { baseEndpoint } from '~/src/app/shared/utils/constants/baseEndpoint';
import { recipient } from '~/src/app/shared/utils/constants/recipient';
import FormData from 'form-data';
import { TRunBpmnIntoCamundaResponse } from '~/src/app/shared/types';

export const updateProcess = async (
  xml: string,
  userId: string,
  clientId: string,
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
          value: clientId
        },
        {
          name: 'userId',
          value: userId
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

export const implantBpmnIntoCamunda = async (xmlContent: string, filename: string) => {
  try {
    const endpoint = '/file/upload';

    const createBpmnFileBlob = (xmlContent: string): Blob => {
      try {
        const blob = new Blob([xmlContent], { type: 'text/xml' });
        return blob;
      } catch (error) {
        console.error('Erro ao criar arquivo BPMN Blob:', error);
        throw error;
      }
    };

    const bpmnBlob = createBpmnFileBlob(xmlContent);

    const formData = new FormData();
    formData.append('deployment-name', filename);
    formData.append('deployment-source', 'execfy2');
    formData.append('data', bpmnBlob);

    const { data } = await api.post<string>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
};

export const runBpmnIntoCamunda = async (clientId: string, processId: string) => {
  try {
    const body: TRunProcessRequest = {
      commandName: 'ProcessStart',
      recipient,
      commandParameters: [
        {
          name: 'clientId',
          value: clientId
        },
        {
          name: 'processId',
          value: processId
        }
      ]
    };

    const { data } = await api.post<TRunBpmnIntoCamundaResponse[]>(baseEndpoint, body);

    return data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
};
