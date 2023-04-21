import {
  Editor,
  Element as SlateElement,
  Operation,
  Node,
  Text as SlateText,
} from "slate";
import { nanoid } from "nanoid";

type CustomElementWithId = SlateElement & { id: string };
type CustomText = SlateText;
type CustomNode = Editor | CustomElementWithId | CustomText;

export const makeNodeId = (): string => nanoid(16);

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
