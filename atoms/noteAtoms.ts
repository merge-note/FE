import { useRef } from "react";
import { atom } from "jotai";
import { initialValue, useAddIdEditor } from "@/utils/customTextEditor";

//에디터 전달용.
const editor = useAddIdEditor();
export const editorAtom = atom(editor);

//선택된 메모 id.
export const activeMemoIdAtom = atom(null);

//선택된 에디터 엘리먼트 id
export const activeElementIdAtom = atom(null);

//노트 벨류.
export const noteEditorValueAtom = atom(initialValue);
