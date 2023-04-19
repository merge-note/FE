import { MemoListWithCount } from "@/interfaces/memo";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";

type MemoListProps = {
  data: MemoListWithCount | undefined;
  toggleMemoId: number | null;
  setToggleMemoId: (id: number | null) => void;
  handleDropDownToggle: (id: number) => void;
  setSelectedMemoId: (id: number) => void;
  handleMemoFormVisible: () => void;
  handleDelete: (id: number) => void;
  setMemoMode: (mode: "add" | "view" | "edit") => void;
};

const MemoListItem = ({
  data,
  toggleMemoId,
  setToggleMemoId,
  handleDropDownToggle,
  setSelectedMemoId,
  handleMemoFormVisible,
  handleDelete,
  setMemoMode,
}: MemoListProps) => {
  return (
    <>
      {data &&
        data.memos.map((memo) => (
          <div
            className="w-full bg-white border-b-[2px] last:border-b-0 px-3 py-2 cursor-pointer hover:bg-slate-200"
            key={memo.id}
          >
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">{memo.created_at}</p>
              <div className="relative">
                <DehazeRoundedIcon
                  className="text-sm text-gray-400 cursor-pointer"
                  onClick={() => {
                    handleDropDownToggle(memo.id);
                  }}
                />

                {toggleMemoId === memo.id && (
                  <div className="absolute right-0 text-center z-10 w-16 bg-white shadow-xl flex flex-col">
                    <button
                      className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        handleMemoFormVisible();
                        setSelectedMemoId(memo.id);
                        setToggleMemoId(null);
                        setMemoMode("edit");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(memo.id);
                      }}
                      className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div
              className="h-full"
              onClick={() => {
                setSelectedMemoId(memo.id);
                handleMemoFormVisible();
                setMemoMode("view");
              }}
            >
              <h2 className="text-md font-medium text-gray-900 overflow-hidden overflow-ellipsis truncate w-full">
                {memo.title}
              </h2>
              <p className="text-sm text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2 truncate h-full">
                {memo.content}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default MemoListItem;
