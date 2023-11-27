'use client';

import { TableList } from '~shared/components/TableList';
import { listHeaders } from '../dashboardUtils';
import { getSystemToken } from '~/src/app/shared/utils/constants/getSystemToken';
import { TTableListContent } from '~/src/app/shared/types/TTableListContent';
import { Dispatch, SetStateAction } from 'react';

interface ProcessListProps {
  filtaredContent: TTableListContent[];
  currentPage: number;
  totalPages: number;
  ProcessContent: TTableListContent[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const sysToken = getSystemToken();

export function ProcessList({
  filtaredContent,
  currentPage,
  totalPages,
  ProcessContent,
  handlePreviousPage,
  handleNextPage,
  setCurrentPage
}: ProcessListProps) {
  if (!sysToken) return null;

  return (
    <div className="h-fit lg:m-auto">
      <TableList.root>
        <TableList.header>
          <TableList.name titles={listHeaders} />
        </TableList.header>
        <TableList.body>
          <TableList.content content={filtaredContent} />
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
