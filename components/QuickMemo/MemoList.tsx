import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getMemos, deleteMemo } from "@/apis/quickMemos";
import { debounce } from "lodash";
import Searchbar from "@/components/common/Searchbar";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Pagination from "@/components/common/Pagination";
import MemoListItem from "./MemoListItem";
import {
  memoModeAtom,
  selectedMemoIdAtom,
  toggleMemoIdAtom,
  memoSearchQueryAtom,
} from "@/atoms/quickMemoAtoms";

interface Props {
  handleMemoFormVisible: () => void;
}

const QuickMemoList = ({ handleMemoFormVisible }: Props) => {
  const [toggleMemoId, setToggleMemoId] = useAtom(toggleMemoIdAtom);
  const setMemoMode = useSetAtom(memoModeAtom);
  const setmemoSearchQuery = useSetAtom(memoSearchQueryAtom);
  const setSelectedMemoId = useSetAtom(selectedMemoIdAtom);

  const deleteMutation = deleteMemo();

  const handleDelete = (memoId: number) => {
    deleteMutation.mutate(memoId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      setmemoSearchQuery(target.value);
    }
  };

  const debouncedHandleChange = debounce((input) => {
    setmemoSearchQuery(input);
  }, 600);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleChange(e.target.value);
  };

  const handleDropDownToggle = (memoId: number): void => {
    setToggleMemoId((prevId) => (prevId === memoId ? null : memoId));
  };

  const { data } = useAtomValue(getMemos);

  return (
    <div className="h-[calc(100%-2.5rem)] ">
      <div className="h-24">
        <div className="h-10 w-full">
          <Searchbar
            handleKeyDown={handleKeyDown}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full h-14 flex justify-between items-center ">
          <div className="">
            {data && (
              <p className="text-sm font-semibold">
                {data.totalCount} {data.totalCount > 1 ? "Memos" : "Memo"}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              handleMemoFormVisible();
              setMemoMode("add");
            }}
            className="bg-yellow-300 py-2 px-4 flex items-center justify-center shadow outline-none"
          >
            <AddRoundedIcon className="text-sm font-semibold" />
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-6rem)] grid grid-flow-col grid-cols-1 grid-rows-5 lg:grid-flow-row gap-y-1 md:grid-rows-5 md:grid-cols-1 bg-zinc-100">
        <MemoListItem
          data={data}
          toggleMemoId={toggleMemoId}
          setToggleMemoId={setToggleMemoId}
          handleDropDownToggle={handleDropDownToggle}
          handleDelete={handleDelete}
          setSelectedMemoId={setSelectedMemoId}
          handleMemoFormVisible={handleMemoFormVisible}
          setMemoMode={setMemoMode}
        />
      </div>
      <div className="h-10 flex justify-center items-center">
        {data && <Pagination pageCount={data.pageCount ?? 1} />}
      </div>
    </div>
  );
};
export default QuickMemoList;
