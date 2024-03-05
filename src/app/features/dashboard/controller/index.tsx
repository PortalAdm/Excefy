import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { TTableListContent } from '~types/TTableListContent';
import { getAllProcess, getXMLByCommandId } from '../services';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';

export const useDashboardController = () => {
  const { clearLocalDraft } = useLocalBPMN();
  const { user } = useUserInfo();
  const [isFiltring, setIsFiltring] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    clearLocalDraft();
  }, [clearLocalDraft]);

  const getXml = useCallback(
    async (commandId: number) => {
      if (user?.id) {
        const xml = await getXMLByCommandId(user?.id, commandId);

        return xml;
      }
    },
    [user?.id]
  );

  const getProcess = useCallback(async () => {
    const userProcess = await getAllProcess(user?.id);

    return userProcess;
  }, [user?.id]);

  const { data: userProcess, isLoading } = useQuery('userProcess', getProcess, {
    refetchOnWindowFocus: false
  });

  const ProcessContent: TTableListContent[] =
    userProcess && JSON.parse(userProcess as unknown as string);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const splicedContent = ProcessContent?.slice(startIndex, endIndex);

  const [filtaredContent, setFiltaredContent] = useState(splicedContent);

  const totalPages = Math.ceil((ProcessContent?.length || 0) / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const onSearch = (search: string) => {
    if (!search) {
      setFiltaredContent(splicedContent);
      setIsFiltring(false);
      return;
    }

    const filteredItems = ProcessContent?.filter((content) =>
      new RegExp(search, 'i').test(content.commandName)
    );

    if (filteredItems) {
      const newStartIndex = 0;
      const newEndIndex = Math.min(filteredItems.length, itemsPerPage);

      setFiltaredContent(filteredItems.slice(newStartIndex, newEndIndex));
      setCurrentPage(1);
      setIsFiltring(true);
    }
  };

  const tableData = isFiltring ? filtaredContent : splicedContent;

  return {
    tableData,
    currentPage,
    totalPages,
    ProcessContent,
    value,
    isLoading,
    setValue,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch,
    getXml
  };
};
