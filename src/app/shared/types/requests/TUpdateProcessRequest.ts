type TCommandParameters = {
  name: string;
  value: string;
};

export type TUpdateProcessRequest = {
  recipient: string;
  commandName: string;
  commandParameters: TCommandParameters[];
};
