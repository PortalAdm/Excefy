import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { getAllProjects } from '../services';
import { Project } from '~/src/app/shared/types/Project';

const itemsPerPage = 5;

export const useProjectController = () => {
  const { user } = useUserInfo();
  const [isFiltring, setIsFiltring] = useState(false);
  const [value, setValue] = useState('');
  const [filtaredContent, setFiltaredContent] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: userProjects, isLoading } = useQuery(
    'userProjects',
    () => getAllProjects(user.clientId),
    {
      enabled: !!user,
      refetchOnWindowFocus: false
    }
  );

  const splicedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return userProjects?.slice(startIndex, endIndex) || [];
  }, [userProjects, currentPage]);

  const increaseFiltaredContent = useCallback(
    (splicedContent: Project[]) => setFiltaredContent(splicedContent),
    []
  );

  useEffect(() => {
    increaseFiltaredContent(splicedContent);
  }, [increaseFiltaredContent, splicedContent]);

  const totalPages = Math.ceil((userProjects?.length || 0) / itemsPerPage);

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

    const filteredItems = userProjects?.filter((content) =>
      new RegExp(search, 'i').test(content.projectName)
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
    userProjects,
    value,
    isLoading,
    setValue,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch
  };
};
