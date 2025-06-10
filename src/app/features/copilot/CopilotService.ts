import { api } from '../../shared/services/axios/api';

type GenerateTokenResponse = {
  '.expires': string;
  '.issued': string;
  access_token: string;
  clientId: string;
  expires_in: number;
  refresh_token: string;
  token_type: 'bearer';
  userId: string;
};

type ChatCompletionParams = {
  accessToken: string;
  customerId: number;
  screenId: number;
  objectType: number;
  objectId: number;
};

type ChatCompletionResponse = {
  Command: string;
  ObjectUpdate: boolean;
  Response: string;
};

async function generateToken() {
  const response = await api.post<GenerateTokenResponse>(
    '/token',
    new URLSearchParams({
      grant_type: 'password',
      username: process.env.NEXT_PUBLIC_SYS_USERNAME!,
      password: process.env.NEXT_PUBLIC_SYS_PASS!
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
}

async function chatCompletion(question: string, params: ChatCompletionParams) {
  const { accessToken, ...data } = params;

  const response = await api.post<ChatCompletionResponse>(
    '/chat/completions',
    { ...data, question },
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  return {
    command: response.data.Command,
    hasUpdatedObject: response.data.ObjectUpdate,
    response: response.data.Response
  };
}

export const CopilotService = {
  generateToken,
  chatCompletion
};
