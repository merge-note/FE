import React from "react";
import tw from "twin.macro";
import Bold from "../../../public/icons/EditorToolbar/Bold.svg";
import Underline from "../../../public/icons/EditorToolbar/Underline.svg";
import Italic from "../../../public/icons/EditorToolbar/Italic.svg";
import Header1 from "../../../public/icons/EditorToolbar/Header1.svg";
import Header2 from "../../../public/icons/EditorToolbar/Header2.svg";
import Header3 from "../../../public/icons/EditorToolbar/Header3.svg";
import Quote from "../../../public/icons/EditorToolbar/Quote.svg";
import Odered from "../../../public/icons/EditorToolbar/Odered.svg";
import AlignLeft from "../../../public/icons/EditorToolbar/AlignLeft.svg";
import AlignJustify from "../../../public/icons/EditorToolbar/AlignJustify.svg";
import AlignCenter from "../../../public/icons/EditorToolbar/AlignCenter.svg";
import AlignRight from "../../../public/icons/EditorToolbar/AlignRight.svg";

type Props = {};

const EditorToolbar = (props: Props) => {
  return (
    <Toolbar>
      <Bold />
      <Underline />
      <Italic />
      <Header1 />
      <Header2 />
      <Header3 />
      <Quote />
      <Odered />
      <AlignLeft />
      <AlignJustify />
      <AlignCenter />
      <AlignRight />
    </Toolbar>
  );
};

export default EditorToolbar;

const Toolbar = tw.div`h-6 flex gap-2 bg-red-500 shrink-0`;
