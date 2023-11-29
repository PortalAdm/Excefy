export type ProcessConfigResponse = {
  id: string;
  content: string;
  sender: string;
  recipient: string;
  channel: string;
  group: string;
  dispatch: string;
  commandName: string | null;
  commandParameters: string[] | null;
};
