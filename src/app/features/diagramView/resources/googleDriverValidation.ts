export const getActionFromXML = (xmlDoc: Document) => {
  const inputParameters = xmlDoc.getElementsByTagName('camunda:inputParameter');
  return String(inputParameters[0]?.textContent);
};

const getVisibleEntriesForAction = (action: string): string[] => {
  const actionVisibilityMap: Record<string, string[]> = {
    get_file_list: [
      'custom-entry-google-drive-connector-0', // Ação
      'custom-entry-google-drive-connector-1', // Conexão
      'custom-entry-google-drive-connector-2', // Pasta
      'custom-entry-google-drive-connector-5' // Lista de arquivos (response)
    ],
    download_file: [
      'custom-entry-google-drive-connector-0', // Ação
      'custom-entry-google-drive-connector-1', // Conexão
      'custom-entry-google-drive-connector-2', // Pasta
      'custom-entry-google-drive-connector-3', // Arquivo atual (hidden)
      'custom-entry-google-drive-connector-6' // Arquivo baixado (response)
    ],
    upload_file: [
      'custom-entry-google-drive-connector-0', // Ação
      'custom-entry-google-drive-connector-1', // Conexão
      'custom-entry-google-drive-connector-2', // Pasta
      'custom-entry-google-drive-connector-4' // Arquivo processado (hidden)
    ]
  };

  return actionVisibilityMap[action] || [];
};

const updateInputElementVisibility = (
  inputElement: HTMLElement,
  entryId: string | null,
  action: string | undefined
) => {
  if (!entryId || !action) {
    inputElement.style.display = 'none';
    return;
  }

  const visibleEntries = getVisibleEntriesForAction(action);
  inputElement.style.display = visibleEntries.includes(entryId) ? 'block' : 'none';
};

export const updateXMLForAction = (
  customInputs: NodeListOf<HTMLElement> | undefined,
  action: string,
  xml: string
) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'application/xml');

  const inputParameters = Array.from(xmlDoc.getElementsByTagName('camunda:inputParameter'));
  const outputParameters = Array.from(xmlDoc.getElementsByTagName('camunda:outputParameter'));

  const allowedParams: Record<string, string[]> = {
    get_file_list: ['action', 'connection', 'folder', 'response', 'connectorId'],
    download_file: [
      'action',
      'connection',
      'folder',
      'currentFile',
      'downloadedFile',
      'connectorId'
    ],
    upload_file: ['action', 'connection', 'folder', 'processedFile', 'connectorId']
  };

  const allowedKeys = allowedParams[action] || [];

  const removeUnallowedParams = (params: Element[]) => {
    params.forEach((param) => {
      const nameAttr = param.getAttribute('name')?.trim() || '';
      if (!allowedKeys.includes(nameAttr)) {
        param.parentNode?.removeChild(param);
      }
    });
  };

  removeUnallowedParams(inputParameters);
  removeUnallowedParams(outputParameters);

  customInputs?.forEach((inputElement) => {
    if (inputElement instanceof HTMLElement) {
      const entryId = inputElement.getAttribute('data-entry-id');

      updateInputElementVisibility(inputElement, entryId, action);
    }
  });

  return new XMLSerializer().serializeToString(xmlDoc);
};
