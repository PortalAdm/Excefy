interface CommandParameters {
  name: string;
  value: string;
}

export interface PostDataProcess {
  recipient: string;
  commandName: string;
  commandParameters: CommandParameters[];
}

interface Bot {
  botName: string;
  botDescription: string;
  createdAt: Date | null;
  lastEdited: Date | null;
}

export interface Message {
  id: string;
  content: Array<Bot>;
  sender: string;
  recipient: string;
  channel: string;
  group: string;
  dispatch: Date;
  commandName: string | null;
  commandParameters: any | null;
}
