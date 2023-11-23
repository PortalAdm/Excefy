'use client';

import { DashBoard } from '~features/dashboard';
import { useDashboardController } from '../../features/dashboard/controller';

export default function Dashboard() {
  const {
    tableData,
    currentPage,
    totalPages,
    ProcessContent,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch
  } = useDashboardController();

  return (
    <div className="p-10 flex flex-col">
      <DashBoard.search onSearch={onSearch} />
      <DashBoard.ProcessList
        filtaredContent={tableData}
        currentPage={currentPage}
        totalPages={totalPages}
        ProcessContent={ProcessContent}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
