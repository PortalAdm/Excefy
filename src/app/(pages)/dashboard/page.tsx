'use client';

import { DashBoard } from '~features/dashboard';
import { useDashboardController } from '../../features/dashboard/controller';

export default function Dashboard() {
  const {
    tableData,
    currentPage,
    totalPages,
    ProcessContent,
    isLoading,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch
  } = useDashboardController();

  return (
    <div className="relative h-screen p-10 flex flex-col gap-20 max-w-7xl lg:mx-auto">
      <DashBoard.search onSearch={onSearch} />
      <div className="w-full absolute top-32 lg:relative lg:top-0">
        <DashBoard.ProcessList
          isLoading={isLoading}
          filtaredContent={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          ProcessContent={ProcessContent}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
