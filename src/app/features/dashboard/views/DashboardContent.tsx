'use client';

import { IoSearchOutline } from 'react-icons/io5';
import { dashboardContentWrapperTv } from '~/src/app/features/dashboard/DashboardTV';
import { useDashboardController } from '~/src/app/features/dashboard/controller';
import { useTableListController } from '~/src/app/features/dashboard/controller/TableListController';
import { listHeaders } from '~/src/app/features/dashboard/dashboardUtils';
import { Icon } from '~/src/app/shared/components/Icon';
import { Search } from '~/src/app/shared/components/Search';
import { TableList } from '~/src/app/shared/components/TableList';

export function DashboardContent() {
  const {
    value,
    tableData,
    currentPage,
    totalPages,
    ProcessContent,
    isLoading,
    setValue,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch
  } = useDashboardController();

  const {
    actions,
    choisedListItem,
    isDeleteModalOpen,
    createdAt,
    lastEdited,
    removeProcess,
    changeModalState
  } = useTableListController();

  return (
    <div className={dashboardContentWrapperTv()}>
      <Search.root>
        <Icon className="pointer-events-none" icon={IoSearchOutline} color="outline" input="left" />
        <Search.input
          value={value}
          placeholder="Pesquise pelo nome do processo"
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </Search.root>

      <div className="h-fit lg:m-auto">
        <TableList.root>
          {choisedListItem && (
            <TableList.modals.delete
              modalState={isDeleteModalOpen}
              listItem={choisedListItem}
              changeModalState={changeModalState}
              deleteProcess={removeProcess}
            />
          )}
          <TableList.header>
            <TableList.name titles={listHeaders} />
          </TableList.header>
          <TableList.body>
            {isLoading && <TableList.Skeleton />}
            {!isLoading && (
              <TableList.content
                actions={actions}
                createdAt={createdAt}
                lastEdited={lastEdited}
                content={tableData}
              />
            )}
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
    </div>
  );
}
