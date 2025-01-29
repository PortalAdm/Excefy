export const getActionFromXML = (xmlDoc: Document) => {
  const inputParameters = xmlDoc.getElementsByTagName('camunda:inputParameter');
  return String(inputParameters[5]?.textContent);
};

const getVisibleEntriesForAction = (action: string): string[] => {
  const actionVisibilityMap: Record<string, string[]> = {
    get_file_list: [
      'custom-entry-google-drive-connector-0', // Ação
      'custom-entry-google-drive-connector-1', // Conexão
      'custom-entry-google-drive-connector-2', // Nome da Pasta
      'custom-entry-google-drive-connector-6' // Lista de arquivos (response)
    ],
    download_file: [
      'custom-entry-google-drive-connector-0', // Ação
      'custom-entry-google-drive-connector-1', // Conexão
      'custom-entry-google-drive-connector-3', // Id do Arquivo (sem ser response)
      'custom-entry-google-drive-connector-7' // Conteúdo (response)
    ],
    upload_file: [
      'custom-entry-google-drive-connector-0', // Ação
      'custom-entry-google-drive-connector-1', // Conexão
      'custom-entry-google-drive-connector-2', // Nome da Pasta
      'custom-entry-google-drive-connector-4', // Nome do Arquivo
      'custom-entry-google-drive-connector-5', // Conteúdo do Arquivo
      'custom-entry-google-drive-connector-8' // Id do Arquivo (response)
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
  return (inputElement.style.display = visibleEntries.includes(entryId) ? 'block' : 'none');
};

export const updateXMLForAction = (
  customInputs: NodeListOf<HTMLElement> | undefined,
  action: string,
  xml: string
) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'application/xml');
  customInputs?.forEach((inputElement) => {
    if (inputElement instanceof HTMLElement) {
      const entryId = inputElement.getAttribute('data-entry-id');
      updateInputElementVisibility(inputElement, entryId, action);
    }
  });

  return new XMLSerializer().serializeToString(xmlDoc);
};
