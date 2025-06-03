import { APIResponse } from '../types/APIResponse';

export function parseResponse([response]: APIResponse) {
  return JSON.parse(response.content);
}
