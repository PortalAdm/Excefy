type TCommandParameters = {
  name: string;
  value: number | string;
};

export type TUpdateProcessRequest = {
  recipient: string;
  commandName: string;
  commandParameters: TCommandParameters[];
};
