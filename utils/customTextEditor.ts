import {
  Editor,
  createEditor,
  Element as SlateElement,
  Operation,
  Descendant,
  BaseEditor,
  Text as SlateText,
} from "slate";

import { ReactEditor, withReact } from "slate-react";
import { nanoid } from "nanoid";

type CustomElementWithId = SlateElement & { id: string };

type CustomNode = Editor | CustomElementWithId | CustomText;
type CustomElement = { type: "paragraph"; children: CustomText[]; id: string };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const makeNodeId = (): string => nanoid(16);

export const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
    id: makeNodeId(),
  },
];

export const addNodeId = (node: CustomNode): void => {
  if (SlateElement.isElement(node)) {
    const elementNode = node as CustomElementWithId;
    elementNode.id = makeNodeId();
  }
};

export const AddIdEditor = (editor: Editor): Editor => {
  const { apply } = editor;

  editor.apply = (operation: Operation): void => {
    if (operation.type === "insert_node") {
      addNodeId(operation.node as CustomNode);
      return apply(operation);
    }

    if (operation.type === "split_node") {
      const customOperation = operation as Operation & {
        properties: { id?: string };
      };
      customOperation.properties.id = makeNodeId();
      return apply(customOperation);
    }

    return apply(operation);
  };

  return editor;
};

export const useAddIdEditor = () => AddIdEditor(withReact(createEditor()));
