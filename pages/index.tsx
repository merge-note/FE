import React from "react";
import tw from "twin.macro";

import VerticalNav from "@/components/common/VerticalNav";
import Memo from "@/components/Memo/Memo";
import NoteList from "@/components/Note/NoteList/NoteList";
import NoteEdit from "@/components/Note/NoteEdit/NoteEdit";

const Container = tw.div`flex w-screen h-screen bg-amber-100`;

const index = () => {
  return (
    <Container>
      <VerticalNav />
      <NoteEdit />
      {/* <NoteList /> */}
      <Memo />
    </Container>
  );
};

export default index;
