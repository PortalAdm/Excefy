import { TCommandParameters } from '../TCommandParameters';

export type TRunProcessRequest = {
  commandName: string;
  recipient: string;
  commandParameters: TCommandParameters[];
};
