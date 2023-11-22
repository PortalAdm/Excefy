import { useCallback, useState } from 'react';
import { usePromise } from '~/src/app/shared/hooks/usePromise';
import { getAllProcess } from '../services';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';

export const useDashboardController = () => {
  const getProcess = useCallback(async () => {
    return await getAllProcess();
  }, []);

  const { data } = usePromise(getProcess);

  const ProcessContent: TTableListContent[] =
    data?.[0] && JSON.parse(data?.[0].content as unknown as string);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const splicedContent = ProcessContent?.slice(startIndex, endIndex);

  const totalPages = Math.ceil((ProcessContent?.length || 0) / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return {
    splicedContent,
    currentPage,
    totalPages,
    ProcessContent,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage
  };
};
