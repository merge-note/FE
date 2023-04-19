import { useRef } from "react";
import { addMemo, getMemoById, editMemo } from "@/apis/quickMemos";
import { memoModeAtom } from "@/atoms/quickMemoAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { MemoMode } from "@/interfaces/memo";
import MemoFormButton from "./MemoFormButton";

interface Props {
  mode: MemoMode;
  handleMemoFormVisible: () => void;
}

const MemoForm = ({ mode, handleMemoFormVisible }: Props) => {
  const setMemoMode = useSetAtom(memoModeAtom);

  const memoAddMutation = addMemo();
  const editMemoMutation = editMemo();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleAddMemo = () => {
    const newMemo = {
      title: titleRef.current!.value,
      content: contentRef.current!.value,
    };

    memoAddMutation.mutate(newMemo);
    handleMemoFormVisible();
  };

  const handleEditMemo = () => {
    const newMemo = {
      title: titleRef.current!.value,
      content: contentRef.current!.value,
    };

    editMemoMutation.mutate(newMemo);
    handleMemoFormVisible();
  };

  const memoDataById = useAtomValue(getMemoById);

  const data = mode === "add" ? undefined : memoDataById;

  return (
    <div className="flex flex-col h-full">
      <div className="h-[calc(100%-2.5rem)]">
        <div className="h-12">
          <input
            key={mode === "add" ? "add" : data?.data?.title}
            type="text"
            className={`h-10 w-full px-3 border-b-[2px] ${
              mode === "view" ? "bg-transparent font-semibold" : "bg-zinc-100"
            } outline-none`}
            placeholder="Title"
            defaultValue={mode === "add" ? "" : data?.data?.title}
            disabled={mode === "view"}
            ref={titleRef}
          />
        </div>
        <textarea
          key={mode === "add" ? "add" : data?.data?.content}
          className={`w-full h-[calc(100%-3rem)] px-3 py-2 ${
            mode === "view" ? "bg-transparent" : "bg-zinc-100"
          } outline-none resize-none`}
          placeholder="Type here"
          defaultValue={mode === "add" ? "" : data?.data?.content}
          disabled={mode === "view"}
          ref={contentRef}
        ></textarea>
      </div>

      <div className="flex py-2 justify-between">
        <MemoFormButton
          text="Cancel"
          onClick={handleMemoFormVisible}
          color="gray"
        />
        {mode === "add" && (
          <MemoFormButton text="Save" onClick={handleAddMemo} color="blue" />
        )}
        {mode === "view" && (
          <MemoFormButton
            text="Edit"
            onClick={() => {
              setMemoMode("edit");
            }}
            color="blue"
          />
        )}
        {mode === "edit" && (
          <MemoFormButton text="Save" onClick={handleEditMemo} color="blue" />
        )}
      </div>
    </div>
  );
};

export default MemoForm;
