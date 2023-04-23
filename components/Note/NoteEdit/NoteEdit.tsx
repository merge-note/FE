import React, { useState } from "react";
import tw from "twin.macro";
import ArrowLeft from "../../../public/icons/ArrowLeft.svg";
import Pin from "../../../public/icons/Pin.svg";
import PinFill from "../../../public/icons/PinFill.svg";

import Editor from "./Editor";

const NoteEdit = () => {
  const [isPinned, setIsPinned] = useState(false);

  const handlePinClick = () => {
    setIsPinned(!isPinned);
  };

  return (
    <NoteContentWrapper>
      <NoteButtons>
        <AddButton>
          <ArrowLeft />
          <p>Back</p>
        </AddButton>
        <Buttons>
          <AddButton onClick={handlePinClick}>
            {isPinned ? <PinFill /> : <Pin />}
            <p>Pin</p>
          </AddButton>
          <Button>Save</Button>
        </Buttons>
      </NoteButtons>
      <NoteTitle placeholder="Untitled" />
      <Editor />
    </NoteContentWrapper>
  );
};

export default NoteEdit;

const NoteContentWrapper = tw.div`w-full min-w-[1105px] h-full p-6 flex flex-col gap-4 bg-[#fff]`;
const NoteButtons = tw.div`h-12 flex items-center justify-between shrink-0`;
const NoteTitle = tw.input`w-full h-12 px-4 shrink-0 text-3xl font-bold text-[#343a3f] outline-none border-b-2 border-b-[#DDE1E6]`;

const Button = tw.button`w-40 h-12 px-3 py-4 flex items-center justify-center text-center text-[#0F62FE] border-2 border-[#0f62fe] hover:bg-[#0F62FE] hover:text-white`;
const Buttons = tw.div`flex items-center justify-center gap-8`;
const AddButton = tw.div`flex gap-2 text-[#0F62FE] cursor-pointer`; //gap 2? 4?
