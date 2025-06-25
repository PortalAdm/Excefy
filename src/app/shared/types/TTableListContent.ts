import { COPILOT_OBJECT_TYPE } from '../../features/copilot/constants';

export type TTableListContent = {
  commandDescription: string;
  commandName: string;
  createdAt: string | null;
  commandId: number;
  lastEdited: string | null;
  enable: boolean | null;
  id: string;
  objectType: COPILOT_OBJECT_TYPE;
};
