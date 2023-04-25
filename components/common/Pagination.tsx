import tw from "twin.macro";
import { useAtom } from "jotai";
import { currentPageNumberAtom } from "@/atoms/quickMemoAtoms";

interface PaginationProps {
  pageCount: number;
}

const Pagination = ({ pageCount = 1 }: PaginationProps): JSX.Element => {
  const [, setCurrentPageNumber] = useAtom(currentPageNumberAtom);
  const [currentPage] = useAtom(currentPageNumberAtom);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  const renderPagination = (): JSX.Element => {
    const pagination = [];
    for (let i = 1; i <= pageCount; i++) {
      pagination.push(
        <li key={i}>
          <button
            onClick={() => handlePageClick(i)}
            css={[
              tw`relative block rounded bg-transparent py-1.5 px-3 text-sm transition-all duration-300`,
              tw`text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`,
              currentPage === i && tw`font-bold`,
            ]}
          >
            {i}
          </button>
        </li>
      );
    }
    return (
      <nav>
        <Ul>
          <li>
            <Button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </Button>
          </li>
          {pagination}
          <li>
            <Button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === pageCount}
            >
              &raquo;
            </Button>
          </li>
        </Ul>
      </nav>
    );
  };
  return renderPagination();
};

export default Pagination;

const Ul = tw.ul`h-12 shrink-0 flex items-center justify-center`;
const Button = tw.button`relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`;
