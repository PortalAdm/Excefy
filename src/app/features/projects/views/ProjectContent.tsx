'use client';

import { IoSearchOutline } from 'react-icons/io5';
import { Icon } from '~/src/app/shared/components/Icon';
import { Search } from '~/src/app/shared/components/Search';
import { TableList } from '~/src/app/shared/components/TableList';
import { projectContentWrapperTv } from '../ProjectTV';
import { useProjectController } from '../controller';
import { useTableListController } from '../controller/TableListController';
import { listHeaders } from '../projectUtils';

export function ProjectContent() {
  const {
    value,
    currentPage,
    totalPages,
    tableData,
    userProjects,
    isLoading,
    setValue,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    onSearch
  } = useProjectController();

  const {
    actions,
    choisedListItem,
    isDeleteModalOpen,
    createdAt,
    lastEdited,
    removeProject,
    changeModalState
  } = useTableListController();

  return (
    <div className={projectContentWrapperTv()}>
      <Search.root>
        <Icon className="pointer-events-none" icon={IoSearchOutline} color="outline" input="left" />
        <Search.input
          value={value}
          placeholder="Pesquise pelo nome do projeto"
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
              type="project"
              modalState={isDeleteModalOpen}
              listItem={choisedListItem}
              changeModalState={changeModalState}
              deleteItem={removeProject}
            />
          )}
          <TableList.header>
            <TableList.name titles={listHeaders} />
          </TableList.header>
          <TableList.body>
            {isLoading && <TableList.Skeleton />}
            {!isLoading && (
              <TableList.content
                type="projects"
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
          data={userProjects || []}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
