export type TBPMNDraft = {
  id: string;
  commandId: number;
  commandName: string;
  processDescription?: string;
  xml: string;
  isEdditing: boolean;
  createdAt?: string;
};
