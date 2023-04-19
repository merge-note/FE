import { atom } from "jotai";

export const userInfoAtom = atom({ email: "", password: "" });
export const inputVerificationCodeAtom = atom<number>(0);
export const userNameAtom = atom("");
export const userPictureAtom = atom("");
