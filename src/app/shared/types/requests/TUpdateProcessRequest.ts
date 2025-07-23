import { TCommandParameters } from '../TCommandParameters';

export type TUpdateProcessRequest = {
  recipient: string;
  commandName: string;
  commandParameters: TCommandParameters[];
};
