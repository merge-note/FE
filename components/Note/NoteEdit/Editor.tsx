import React, { useMemo, useCallback, useRef, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Element, Transforms, Point, Editor as SlateEditor } from "slate";
import {
  Slate,
  Editable,
  RenderElementProps,
  ReactEditor,
  DefaultElement,
} from "slate-react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useAtom } from "jotai";
import {
  activeElementIdAtom,
  noteEditorValueAtom,
  editorAtom,
} from "@/atoms/noteAtoms";

import EditorToolbar from "./EditorToolbar";

const Editor = () => {
  const [editor] = useAtom(editorAtom);
  const [activeId, setActiveId] = useAtom(activeElementIdAtom);
  const [value, setValue] = useAtom(noteEditorValueAtom);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (editor.children.length > 0) {
      const firstTextNode = SlateEditor.node(editor, [0, 0]);
      if (firstTextNode) {
        const point: Point = { path: [0, 0], offset: 0 };
        Transforms.select(editor, point);
      }
    }
    ReactEditor.focus(editor);
  }, []);

  const items = useMemo(
    () =>
      editor.children.filter(Element.isElement).map((element) => element.id),
    [editor.children]
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
    <NoteEditor>
      <EditorToolbar />
      <TextContainer>
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
                <StyledEditable
                  renderElement={renderElement}
                  autoFocus
                  autoCorrect="false"
                />
              </Slate>
            </SortableContext>
          </TextContainer>
        </DndContext>
      </TextContainer>
    </NoteEditor>
  );
};

export default Editor;

const NoteEditor = tw.div`h-full px-4 py-2 bg-blue-500`;
const Toolbar = tw.div`h-6 bg-red-500 shrink-0`;
const TextContainer = tw.div`h-[calc(100%_-_24px)] bg-amber-200`;
const StyledEditable = styled(Editable)`
  font-size: 18px;
  color: #343a3f;
`;
