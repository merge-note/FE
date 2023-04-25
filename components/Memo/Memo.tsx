import React, { useState, useRef } from "react";
import tw from "twin.macro";
import { debounce } from "lodash";
import { Element, Transforms } from "slate";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";

import { useAtom } from "jotai";
import {
  editorAtom,
  activeMemoIdAtom,
  noteEditorValueAtom,
} from "@/atoms/noteAtoms";
import { memoSearchQueryAtom } from "@/atoms/quickMemoAtoms";
import { getMemos } from "@/apis/quickMemos";
import { makeNodeId } from "@/utils/customTextEditor";
import { useModal, Modal } from "./MemoModal";

import DraggableMemoItem from "./DraggableMemoItem";
import Pagination from "../common/Pagination";
import Search from "../../public/icons/Search.svg";

const Memo = () => {
  const [editor] = useAtom(editorAtom);
  const [noteEditorValue, setNoteEditorValue] = useAtom(noteEditorValueAtom);

  const [activeMemoId, setActiveMemoId] = useAtom(activeMemoIdAtom);
  const [memoSearchQuery, setMemoSearchQuery] = useAtom(memoSearchQueryAtom);
  const [searchInput, setSearchInput] = useState("");

  const [memos] = useAtom(getMemos);
  const memoData = memos.data?.memos ?? [];
  const activeMemo = memoData.find((memo) => memo.id === activeMemoId);

  const memoListRef = useRef<HTMLDivElement>(null);
  const memoListHeight = memoListRef.current?.offsetHeight || 0;
  const draggableMemoItemHeight = memoListHeight / 5;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      },
    })
  );

  const handleMemoDragStart = (event) => {
    setActiveMemoId(event.active.id);
  };

  const handleMemoDragEnd = (event) => {
    const activeMemo = memoData.find((memo) => memo.id === event.active.id);

    if (activeMemo) {
      const firstNode = editor.children[0];

      if (
        Element.isElement(firstNode) &&
        firstNode.children &&
        firstNode.children.length === 1 &&
        firstNode.children[0].text === ""
      ) {
        Transforms.insertText(editor, activeMemo.content, { at: [0, 0] });
      } else {
        const newElement: CustomElement = {
          type: "paragraph",
          children: [{ text: activeMemo.content }],
          id: makeNodeId(),
        };
        Transforms.insertNodes(editor, newElement);
        setNoteEditorValue([...noteEditorValue, newElement]);
      }
    }
    setActiveMemoId(null);
  };

  const debouncedHandleChange = debounce((input) => {
    setMemoSearchQuery(input);
  }, 600);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedHandleChange(e.target.value);
  };

  const { isOpen, openModal, closeModal } = useModal();

  const memoItemStyle = {
    height: draggableMemoItemHeight,
  };

  return (
    <MemoWrapper>
      <Modal isOpen={isOpen} onClose={closeModal}></Modal>
      <Button onClick={openModal}>Add Memo</Button>
      <InputBox>
        <Search width={24} height={24} />
        <Input onChange={handleChange} />
      </InputBox>

      <DndContext
        sensors={sensors}
        onDragStart={handleMemoDragStart}
        onDragEnd={handleMemoDragEnd}
      >
        <MemoList ref={memoListRef}>
          {memoData.map((memo) => (
            <DraggableMemoItem
              key={memo.id}
              id={memo.id}
              content={memo.content}
              createdAt={memo.created_at}
            />
          ))}
        </MemoList>
        <DragOverlay>
          {activeMemoId ? (
            <MemoItem style={memoItemStyle}>
              <MemoItemHeader>
                <p>{activeMemo?.created_at}</p>
                <Buttons></Buttons>
              </MemoItemHeader>
              <MemoItemContent>{activeMemo?.content}</MemoItemContent>
            </MemoItem>
          ) : null}
        </DragOverlay>
      </DndContext>
      <Pagination pageCount={memos?.data?.pageCount ?? 1} />
    </MemoWrapper>
  );
};

export default Memo;

// const MemoList = tw.div`w-full h-full flex flex-col gap-1 box-border`;
const MemoList = tw.div`w-full h-full flex flex-col gap-1 box-border grow`;

const MemoWrapper = tw.div`w-80 h-full px-4 py-6 shrink-0 flex flex-col gap-4 bg-[#FFFFFF] border-l border-l-[#DDE1E6] overflow-hidden`;
const Button = tw.button`w-full h-12 px-3 py-4 flex items-center justify-center text-center text-[#0F62FE] border-2 border-[#0f62fe] hover:bg-[#0F62FE] hover:text-white`;
const InputBox = tw.div`w-full h-12 bg-[#F2F4F8] px-4 py-3 flex flex-row gap-2`;
const Input = tw.input`w-full bg-[#F2F4F8] outline-none box-border`;
const MemoItem = tw.div` bg-[#fff] border border-[#DDE1E6] px-3 py-2`;
const MemoItemHeader = tw.div`h-6 flex items-center justify-between text-xs text-[#697077]`;
const MemoItemContent = tw.p`line-clamp-3 overflow-hidden`;
const Buttons = tw.div`flex gap-2`;
