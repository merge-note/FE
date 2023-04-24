import React from "react";
import tw from "twin.macro";
import { Element, Transforms } from "slate";
import { DndContext } from "@dnd-kit/core";
import { useAtom } from "jotai";
import {
  editorAtom,
  activeMemoIdAtom,
  memoContentsAtom,
  noteEditorValueAtom,
} from "@/atoms/noteAtoms";
import { makeNodeId } from "@/utils/customTextEditor";

import DraggableMemoItem from "./DraggableMemoItem";

const Memo = () => {
  const [editor] = useAtom(editorAtom);
  const [noteEditorValue, setNoteEditorValue] = useAtom(noteEditorValueAtom);

  const [activeMemoId, setActiveMemoId] = useAtom(activeMemoIdAtom);
  const [memoContents, setMemoContents] = useAtom(memoContentsAtom);

  const handleMemoDragStart = (event) => {
    setActiveMemoId(event.active.id);
  };

  const handleMemoDragEnd = (event) => {
    const activeMemo = memoContents.find((memo) => memo.id === event.active.id);

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

  return (
    <MemoWrapper>
      <Button>Add Memo</Button>
      <Input></Input>
      <DndContext
        onDragStart={handleMemoDragStart}
        onDragEnd={handleMemoDragEnd}
      >
        <MemoList>
          {memoContents.map((memo) => (
            <DraggableMemoItem
              key={memo.id}
              id={memo.id}
              content={memo.content}
            />
          ))}
        </MemoList>
      </DndContext>
      <Pagenation></Pagenation>
    </MemoWrapper>
  );
};

export default Memo;

const MemoList = tw.div`w-full h-full flex flex-col gap-1`;
const Pagenation = tw.div`w-full h-12 shrink-0 bg-amber-100`;
const MemoWrapper = tw.div`w-80 h-full px-4 py-6 shrink-0 flex flex-col gap-4 bg-[#FFFFFF] border-l border-l-[#DDE1E6]`;
const Button = tw.button`w-full h-12 px-3 py-4 flex items-center justify-center text-center text-[#0F62FE] border-2 border-[#0f62fe] hover:bg-[#0F62FE] hover:text-white`;
const Input = tw.input`w-full h-12 px-3 py-4 bg-[#F2F4F8]`;
