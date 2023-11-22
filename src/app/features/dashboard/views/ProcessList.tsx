'use client';

import { TableList } from '~shared/components/TableList';
import { listHeaders } from '../dashboardUtils';
import { useDashboardController } from '../controller';
import { Suspense } from 'react';

export function ProcessList() {
  const {
    splicedContent,
    currentPage,
    totalPages,
    ProcessContent,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage
  } = useDashboardController();

  return (
    <div className="w-fit h-fit m-auto">
      <TableList.root>
        <TableList.header>
          <TableList.name titles={listHeaders} />
        </TableList.header>
        <TableList.body>
          <Suspense fallback={<p>Carregando...</p>}>
            <TableList.content content={splicedContent} />
          </Suspense>
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
