import { useState, useRef, useEffect } from "react";
import Close from "../../public/icons/Close.svg";
import tw from "twin.macro";

import { addMemo } from "@/apis/quickMemos";

// 모달 컴포넌트
export const Modal = ({ isOpen, onClose }) => {
  const addMemoMutation = addMemo();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  const handleAddMemo = () => {
    const newMemo = {
      content: contentRef.current!.value,
    };
    addMemoMutation.mutate(newMemo);
    onClose();
  };

  return isOpen ? (
    <ModalContainer onClick={handleAddMemo}>
      <ModalBody onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <p>Memo</p>
          <Close onClick={handleAddMemo} css={tw`cursor-pointer`} />
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
