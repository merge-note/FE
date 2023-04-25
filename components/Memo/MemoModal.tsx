import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import Close from "../../public/icons/Close.svg";
import tw from "twin.macro";

import { addMemo, editMemo } from "@/apis/quickMemos";
import { selectedMemoAtom, memoModeAtom } from "@/atoms/quickMemoAtoms";

// 모달 컴포넌트
export const Modal = ({ isOpen, onClose }) => {
  const addMemoMutation = addMemo();
  const editMemoMutation = editMemo();

  const [selectedMemo, setSelectedMemo] = useAtom(selectedMemoAtom);
  const [memoMode, setMemoMode] = useAtom(memoModeAtom);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
      if (memoMode === "view" || memoMode === "edit") {
        contentRef.current!.value = selectedMemo.content;
        contentRef.current!.readOnly = memoMode === "view";
      } else {
        contentRef.current!.value = "";
        contentRef.current!.readOnly = false;
      }
    }
  }, [isOpen, selectedMemo, memoMode]);

  const handleMemo = () => {
    const newMemo = {
      content: contentRef.current!.value,
    };
    if (memoMode === "edit") {
      setSelectedMemo({
        id: selectedMemo.id,
        content: contentRef.current!.value,
      });
      editMemoMutation.mutate();
    } else if (memoMode === "add") {
      addMemoMutation.mutate(newMemo);
    }
    onClose();
  };

  return isOpen ? (
    <ModalContainer onClick={handleMemo}>
      <ModalBody onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <p>Memo</p>
          <Close onClick={handleMemo} css={tw`cursor-pointer`} />
        </ModalHeader>
        <ModalInput ref={contentRef} />
      </ModalBody>
    </ModalContainer>
  ) : null;
};

// 모달 훅
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

const ModalContainer = tw.div`
  fixed top-0 left-0 w-full h-full flex items-center justify-center
`;

const ModalBody = tw.div`w-96 h-72 flex flex-col p-4 bg-[#fff] border border-[#DDE1E6]`;

const ModalHeader = tw.div`w-full h-[18px] mb-4 flex items-center justify-between text-lg text-[#697077]`;

const ModalInput = tw.textarea`w-full h-full outline-none resize-none`;
