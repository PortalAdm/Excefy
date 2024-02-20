'use client';

import { TableList } from '~shared/components/TableList';
import { listHeaders } from '../dashboardUtils';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { Dispatch, SetStateAction } from 'react';

interface ProcessListProps {
  filtaredContent: TTableListContent[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  ProcessContent: TTableListContent[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export function ProcessList({
  filtaredContent,
  currentPage,
  totalPages,
  isLoading,
  ProcessContent,
  handlePreviousPage,
  handleNextPage,
  setCurrentPage
}: ProcessListProps) {
  return (
    <div className="h-fit lg:m-auto">
      <TableList.root>
        <TableList.header>
          <TableList.name titles={listHeaders} />
        </TableList.header>
        <TableList.body>
          {isLoading && <TableList.Skeleton />}
          {!isLoading && <TableList.content content={filtaredContent} />}
        </TableList.body>
      </TableList.root>
      <TableList.pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        nextDisable={currentPage === totalPages}
        prevDisable={currentPage === 1}
        data={ProcessContent}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
