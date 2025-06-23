'use client';

import { IoSearchOutline } from 'react-icons/io5';
import { dashboardContentWrapperTv } from '~/src/app/features/dashboard/DashboardTV';
import { useDashboardController } from '~/src/app/features/dashboard/controller';
import { useTableListController } from '~/src/app/features/dashboard/controller/TableListController';
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
              type="dashboard"
              modalState={isDeleteModalOpen}
              listItem={choisedListItem}
              changeModalState={changeModalState}
              deleteItem={removeProcess}
            />
          )}
          <TableList.header>
            <th className="text-start w-[222px] p-2 text-sm text-black font-black">Nome</th>
            <th className="text-start w-[178px] p-2 text-sm text-black font-black">Descrição</th>
            <th className="text-start w-[134px] p-2 text-sm text-black font-black">Criação</th>
            <th className="text-start w-[120px] p-2 text-sm text-black font-black">
              Última Edição
            </th>
            <th className="text-start w-[70px] p-2 text-sm text-black font-black">Status</th>
          </TableList.header>
          <TableList.body>
            {isLoading && <TableList.Skeleton />}
            {!isLoading && (
              <TableList.content
                type="dashboard"
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
