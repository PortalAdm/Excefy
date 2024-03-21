export interface TUpdateProcessConfigurationRequest {
  processName: string;
  processDescription: string;
  userId: string;
  clientId: string;
  commandId: number;
  lastEdited: string;
  createdAt: string;
}
