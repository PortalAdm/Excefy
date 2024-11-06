export type TProcessInstance = {
  links: Array<{
    method: string;
    href: string;
    rel: string;
  }>;
  id: string;
  definitionId: string;
  businessKey: string | null;
  caseInstanceId: string | null;
  ended: boolean;
  suspended: boolean;
  tenantId: string | null;
};

export type TRunBpmnIntoCamundaResponse = {
  channel: string;
  commandName: string | null;
  commandParameters: string | null;
  content: string; // JSON stringified ProcessInstance
  dispatch: string;
  group: string;
  id: string;
  recipient: string;
  sender: string;
};
