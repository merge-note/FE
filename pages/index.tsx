import tw from "twin.macro";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  createEditor,
  BaseEditor,
  Descendant,
  Element,
  Transforms,
  Editor,
  Point,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  DefaultElement,
  RenderElementProps,
} from "slate-react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddIdEditor, makeNodeId } from "./Editor";

type CustomElement = { type: "paragraph"; children: CustomText[]; id: string };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

//기본 밸류(엘리먼트 수정)
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
    id: makeNodeId(),
  },
];

//메모 밸류
const memoContents = [
  { id: "1", content: "내용1" },
  { id: "2", content: "내용2" },
];

const useAddIdEditor = () =>
  useMemo(() => AddIdEditor(withReact(createEditor())), []);

const index = () => {
  const editor = useAddIdEditor();
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState(null);
  const [activeMemoId, setActiveMemoId] = useState(null);
  const activeElement = editor.children.find(
    (x) => Element.isElement(x) && x.id === activeId
  );

  const handleDragStart = (event) => {
    if (event.active) {
      setActiveId(event.active.id);
    }
  };

  const handleDragEnd = (event) => {
    const overId = event.over?.id;
    const overIndex = editor.children.findIndex(
      (x) => Element.isElement(x) && x.id === overId
    );

    if (overId !== activeId && overIndex !== -1) {
      Transforms.moveNodes(editor, {
        at: [],
        match: (node) => Element.isElement(node) && node.id === activeId,
        to: [overIndex],
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  useEffect(() => {
    if (editor.children.length > 0) {
      const firstTextNode = Editor.node(editor, [0, 0]);
      if (firstTextNode) {
        const point: Point = { path: [0, 0], offset: 0 };
        Transforms.select(editor, point);
      }
    }
    ReactEditor.focus(editor);
  }, []);

  //에디터 값(엘리먼트들)이 저장됨.
  const [value, setValue] = useState(initialValue);

  //에디터에서 SortablContext-순서 정리용-에 넣을 아이템들의 아이디 추출.
  const items = useMemo(
    () =>
      editor.children.filter(Element.isElement).map((element) => element.id),
    [editor.children]
  );

  //에디터 내에서 렌더될 엘리먼트의 모습.
  const renderElement = useCallback((props: RenderElementProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: props.element.id,
      });

    const style = {
      display: "flex",
      padding: "2px",
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <div
          contentEditable={false}
          style={{
            marginRight: "10px",
            cursor: "pointer",
            width: "10px",
            height: "auto",
            backgroundColor: "black",
          }}
          {...attributes}
          {...listeners}
        ></div>
        <DefaultElement {...props} />
      </div>
    );
  }, []);

  return (
    <Test>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <TextContainer>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            >
              <Editable
                renderElement={renderElement}
                autoFocus
                autoCorrect="false"
              />
            </Slate>
          </SortableContext>
        </TextContainer>
        <Memo>
          {memoContents.map((memo) => {
            const { attributes, listeners, setNodeRef } = useDraggable({
              id: memo.id,
            });

            return (
              <div
                key={memo.id}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={{ cursor: "pointer" }}
              >
                {memo.content}
              </div>
            );
          })}
        </Memo>
      </DndContext>
    </Test>
  );
};

export default index;

const Test = tw.div`w-screen h-screen bg-amber-100 flex p-10`;
const Memo = tw.div`w-96 bg-amber-800`;
const TextContainer = tw.div`w-[calc(100%_-_24rem)] break-all`;
