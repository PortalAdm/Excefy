import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { TTableListContent } from '~types/TTableListContent';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { getAllProjects } from '../services';

const itemsPerPage = 5;

export const useProjectController = () => {
  const { user } = useUserInfo();
  const [isFiltring, setIsFiltring] = useState(false);
  const [value, setValue] = useState('');
  const [filtaredContent, setFiltaredContent] = useState<TTableListContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProject = useCallback(async () => {
    const userProject = await getAllProjects(user?.clientId);

    return userProject;
  }, [user?.clientId]);

  const { data: userProject, isLoading } = useQuery('userProject', getProject, {
    refetchOnWindowFocus: false
  });

  const ProjectContent: TTableListContent[] = useMemo(
    () => userProject && JSON.parse(userProject as unknown as string),
    [userProject]
  );

  const splicedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return ProjectContent?.slice(startIndex, endIndex);
  }, [ProjectContent, currentPage]);

  const increaseFiltaredContent = useCallback(
    (splicedContent: TTableListContent[]) => setFiltaredContent(splicedContent),
    []
  );

  useEffect(() => {
    increaseFiltaredContent(splicedContent);
  }, [increaseFiltaredContent, splicedContent]);

  const totalPages = Math.ceil((ProjectContent?.length || 0) / itemsPerPage);

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

    const filteredItems = ProjectContent?.filter((content) =>
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
    ProjectContent,
    value,
    isLoading,
    setValue,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch
  };
};
