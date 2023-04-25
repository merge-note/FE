import tw from "twin.macro";
import { useDraggable } from "@dnd-kit/core";
import { useAtom } from "jotai";
import Trash from "../../public/icons/Trash.svg";
import Pencil from "../../public/icons/Pencil.svg";

import { deleteMemo } from "@/apis/quickMemos";
import { selectedMemoAtom, memoModeAtom } from "@/atoms/quickMemoAtoms";

const DraggableMemoItem = ({ id, content, createdAt, openModal }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });
  const [, setSelectedMemo] = useAtom(selectedMemoAtom);
  const [, setMemoMode] = useAtom(memoModeAtom);

  const handleSelectMemo = (memoId, memoCotnent) => {
    setSelectedMemo({
      id: memoId,
      content: memoCotnent,
    });
  };

  const style = {
    backgroundColor: isDragging ? "#ddd" : "#fff", // isDragging 값에 따라 배경색 변경
  };

  const deleteMutation = deleteMemo();

  const handleDelete = (memoId: number) => {
    deleteMutation.mutate(memoId);
  };

  return (
    <MemoItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        handleSelectMemo(id, content);
        setMemoMode("view");
        openModal();
      }}
    >
      <MemoItemHeader>
        <p>{createdAt}</p>
        <Buttons>
          <Trash
            width="14"
            height="14"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
          />
          <Pencil
            width="14"
            height="14"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectMemo(id, content);
              setMemoMode("edit");
              openModal();
            }}
          />
        </Buttons>
      </MemoItemHeader>
      <MemoItemContent>{content}</MemoItemContent>
    </MemoItem>
  );
};

export default DraggableMemoItem;

const MemoItem = tw.div` w-full h-1/5 bg-[#fff] border border-[#DDE1E6] px-3 py-2 line-clamp-3 overflow-hidden`;
const MemoItemHeader = tw.div`h-6 flex items-center justify-between text-xs text-[#697077]`;
const MemoItemContent = tw.p`line-clamp-4 overflow-hidden`;
const Buttons = tw.div`flex gap-2`;
