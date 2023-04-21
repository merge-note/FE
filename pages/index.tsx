import tw from "twin.macro";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
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
  DragOverlay,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddIdEditor, makeNodeId } from "@/utils/Editor";

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

//에디터
const useAddIdEditor = () =>
  useMemo(() => AddIdEditor(withReact(createEditor())), []);

const DraggableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    padding: "2px",
    width: "100%",
    height: "50px",
    margin: "2px",
    backgroundColor: "red",
    cursor: "pointer",
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {content}
    </div>
  );
};

const memoContents = [
  { id: "1", content: "내용1" },
  { id: "2", content: "내용2" },
];

const App = () => {
  const [activeMemoId, setActiveMemoId] = useState(null);
  const Memosensors = useSensors(useSensor(PointerSensor));
  const textContainerRef = useRef<HTMLDivElement>(null);

  const handleMemoDragStart = (event) => {
    setActiveMemoId(event.active.id);
  };

  const handleMemoDragEnd = (event) => {
    const activeMemo = memoContents.find((memo) => memo.id === event.active.id);
    if (activeMemo) {
      const newElement: CustomElement = {
        type: "paragraph",
        children: [{ text: activeMemo.content }],
        id: makeNodeId(),
      };
      Transforms.insertNodes(editor, newElement);
      setValue([...value, newElement]);
    }
    setActiveMemoId(null);
  };

  const activeMemo = activeMemoId
    ? memoContents.find((memo) => memo.id === activeMemoId)
    : null;

  const editor = useAddIdEditor();
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState(null);

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
        sensors={Memosensors}
        onDragStart={handleMemoDragStart}
        onDragEnd={handleMemoDragEnd}
      >
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <TextContainer ref={textContainerRef}>
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
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
        </DndContext>
        <Memo>
          {memoContents.map((memo) => (
            <DraggableItem key={memo.id} id={memo.id} content={memo.content} />
          ))}
        </Memo>
        <DragOverlay>
          {activeMemo ? (
            <DraggableItem id={activeMemo.id} content={activeMemo.content} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Test>
  );
};

export default App;

const Test = tw.div`w-screen h-screen bg-amber-100 flex p-10`;
const Memo = tw.div`w-96 bg-amber-800 p-2`;
const TextContainer = tw.div`w-[calc(100%_-_24rem)] break-all`;
