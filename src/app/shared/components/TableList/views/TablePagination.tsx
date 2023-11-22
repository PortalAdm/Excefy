import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { TTableListContent } from '../../../types/TTableListContent';
import { paginationNumberButtonTv } from '../TableListTV';

interface TablePaginationProps {
  data: TTableListContent[];
  prevDisable: boolean;
  nextDisable: boolean;
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  setCurrentPage: (page: number) => void;
}

export function TablePagination({
  data = [],
  prevDisable = false,
  nextDisable = false,
  currentPage,
  handleNextPage,
  handlePreviousPage,
  setCurrentPage
}: TablePaginationProps) {
  const renderItems = () => {
    const itemsPerPage = 5;
    const visibleItemsCount = 3;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    if (totalPages <= visibleItemsCount) {
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`${paginationNumberButtonTv()} ${
            currentPage === i + 1 ? 'font-bold text-primary' : ''
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ));
    } else {
      let startPage = 1;

      if (currentPage > 1 && currentPage + visibleItemsCount - 1 <= totalPages) {
        startPage = currentPage - 1;
      } else if (currentPage + visibleItemsCount - 1 > totalPages) {
        startPage = Math.max(totalPages - visibleItemsCount + 1, 1);
      }

      const endPage = Math.min(startPage + visibleItemsCount - 1, totalPages);

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNumber = startPage + i;

        return (
          <button
            key={pageNumber}
            className={`${paginationNumberButtonTv()} ${
              currentPage === pageNumber ? 'font-bold text-primary' : ''
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      });
    }
  };

  return (
    <nav className="flex items-center justify-between max-w-[980px]">
      <div className="-mt-px w-0 flex-1 flex">
        <div className="-mt-px w-0 flex-1 flex">
          <button
            disabled={prevDisable}
            onClick={handlePreviousPage}
            className="disabled:text-black/50 disabled:pointer-events-none border-t-2 border-transparent pt-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            <FaArrowLeft
              className="mr-3 h-5 w-5 text-gray-400 hover:-translate-x-1 duration-300"
              aria-hidden="true"
            />
            Anterior
          </button>
        </div>
      </div>
      <div className="hidden md:-mt-px md:flex m-auto">{renderItems()}</div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <div className="-mt-px w-0 flex-1 flex justify-end">
          <button
            disabled={nextDisable}
            onClick={handleNextPage}
            className="disabled:text-black/50 disabled:pointer-events-none border-t-2 border-transparent pt-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Próximo
            <FaArrowRight
              className="ml-3 h-5 w-5 text-gray-400 hover:translate-x-1 duration-300"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
