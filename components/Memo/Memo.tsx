import React from "react";
import tw from "twin.macro";
import Trash from "../../public/icons/Trash.svg";
import Pencil from "../../public/icons/Pencil.svg";

const MemoList = tw.div`w-full h-full`;
const MemoItem = tw.div`h-1/5 bg-[#fff] border border-[#DDE1E6] px-3 py-2`;
const Pagenation = tw.div`w-full h-12 shrink-0 bg-amber-100`;
const MemoWrapper = tw.div`w-80 h-full px-4 py-6 shrink-0 flex flex-col gap-4 bg-[#FFFFFF] border-l border-l-[#DDE1E6]`;
const Button = tw.button`w-full h-12 px-3 py-4 flex items-center justify-center text-center text-[#0F62FE] border-2 border-[#0f62fe] hover:bg-[#0F62FE] hover:text-white`;

const Input = tw.input`w-full h-12 px-3 py-4 bg-[#F2F4F8]`;

const MemoItemHeader = tw.div`h-6 flex items-center justify-between text-xs text-[#697077]`;
const Buttons = tw.div`flex gap-2`;

const Memo = () => {
  return (
    <MemoWrapper>
      <Button>Add Memo</Button>
      <Input />
      <MemoList>
        <MemoItem>
          <MemoItemHeader>
            <p>2023.04.23 01:00</p>
            <Buttons>
              <Trash width="14" height="14" />
              <Pencil width="14" height="14" />
            </Buttons>
          </MemoItemHeader>
          <p>Lorem ipsum dolor sit amet, con</p>
        </MemoItem>
        {/* ... */}
      </MemoList>
      <Pagenation></Pagenation>
    </MemoWrapper>
  );
};

export default Memo;
