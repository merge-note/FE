import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Element, Transforms, Point, Editor as SlateEditor } from "slate";
import { Slate, Editable, RenderElementProps, ReactEditor } from "slate-react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useAddIdEditor, initialValue } from "@/utils/customTextEditor";
import CustomElement from "./CustomElement";

type Props = {};

const Editor = (props: Props) => {
  const [activeId, setActiveId] = useState(null);
  const [value, setValue] = useState(initialValue);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const editor = useAddIdEditor();
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
    return <CustomElement {...props} />;
  }, []);

  return (
    <NoteEditor>
      <Toolbar />
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
