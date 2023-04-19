import { atom } from "jotai";
import { MemoMode } from "@/interfaces/memo";

export const currentPageNumberAtom = atom<number>(1);

export const memoSearchQueryAtom = atom<string>("");

export const selectedMemoIdAtom = atom<number | null>(null);
export const toggleMemoIdAtom = atom<number | null>(null);

export const memoModeAtom = atom<MemoMode>("add");

export const isMemoFormVisibleAtom = atom<boolean>(false);

export const isCollapsedAtom = atom<boolean>(false);
