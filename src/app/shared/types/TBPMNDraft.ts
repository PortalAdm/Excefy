export type TBPMNDraft = {
  id: string;
  projectId: string;
  commandId: number;
  commandName: string;
  processDescription?: string;
  xml: string;
  isEdditing: boolean;
  createdAt?: string;
};
