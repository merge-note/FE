import { atom } from "jotai";

export const searchSearchQueryAtom = atom<string>("");
export const searchTempQueryAtom = atom("");
export const searchResourceAtom = atom("google");
export const searchExcutedAtom = atom(false);
