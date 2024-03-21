import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { TTableListContent } from '~types/TTableListContent';
import { getAllProcess } from '../services';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';

const itemsPerPage = 5;

export const useDashboardController = () => {
  const { clearLocalDraft } = useLocalBPMN();
  const { user } = useUserInfo();
  const [isFiltring, setIsFiltring] = useState(false);
  const [value, setValue] = useState('');
  const [filtaredContent, setFiltaredContent] = useState<TTableListContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    clearLocalDraft();
  }, [clearLocalDraft]);

  const getProcess = useCallback(async () => {
    const userProcess = await getAllProcess(user?.clientId);

    return userProcess;
  }, [user?.clientId]);

  const { data: userProcess, isLoading } = useQuery('userProcess', getProcess, {
    refetchOnWindowFocus: false
  });

  const ProcessContent: TTableListContent[] = useMemo(
    () => userProcess && JSON.parse(userProcess as unknown as string),
    [userProcess]
  );

  const splicedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return ProcessContent?.slice(startIndex, endIndex);
  }, [ProcessContent, currentPage]);

  const increaseFiltaredContent = useCallback(
    (splicedContent: TTableListContent[]) => setFiltaredContent(splicedContent),
    []
  );

  useEffect(() => {
    increaseFiltaredContent(splicedContent);
  }, [increaseFiltaredContent, splicedContent]);

  const totalPages = Math.ceil((ProcessContent?.length || 0) / itemsPerPage);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

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
    onSearch
  };
};
