import { useCallback, useState } from 'react';
import { getAllProcess } from '../services';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { useSystemAuth } from '../../auth/controller/useSystemAuth';
import { useQuery } from 'react-query';

const timeToRefetchCache = 1000 * 60 * 60 * 2; // 2 hora

export const useDashboardController = () => {
  const [isFiltring, setIsFiltring] = useState(false);
  const [value, setValue] = useState('');

  const { getSystemToken } = useSystemAuth();

  const getProcess = useCallback(async () => {
    return await getAllProcess(getSystemToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data } = useQuery('userProcess', getProcess, {
    staleTime: timeToRefetchCache
  });

  const ProcessContent: TTableListContent[] =
    data?.[0] && JSON.parse(data?.[0].content as unknown as string);

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
    setValue,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch
  };
};
