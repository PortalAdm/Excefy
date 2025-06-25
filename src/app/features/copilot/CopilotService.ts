import { api } from '../../shared/services/axios/api';
import { COPILOT_OBJECT_TYPE, COPILOT_SCREEN_ID } from './constants';

type ChatCompletionParams = {
  customerId: number | string;
  userId: number | string;
  screenId: COPILOT_SCREEN_ID;
  objectType: COPILOT_OBJECT_TYPE;
  objectId: number | string;
};

type ChatCompletionResponse = {
  Command: string;
  ObjectUpdate: boolean;
  Response: string;
};

async function chatCompletion(question: string, params: ChatCompletionParams) {
  const { customerId, userId, objectId, ...data } = params;

  const response = await api.post<ChatCompletionResponse>('/chat/completions', {
    customerId: Number(customerId),
    userId: Number(userId),
    ...data,
    objectId: Number(objectId),
    question
  });

  return {
    command: response.data.Command,
    hasUpdatedObject: response.data.ObjectUpdate,
    response: response.data.Response
  };
}

export const CopilotService = {
  chatCompletion
};
