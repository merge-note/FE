import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import Plus from "../../../public/icons/Plus.svg";

const NoteContentWrapper = tw.div`w-full min-w-[1105px] h-full p-6 flex flex-col gap-4 bg-[#fff]`;
const HeaderBar = tw.div`h-12 shrink-0 flex items-center justify-between`;
const Headding = tw.h1`text-[42px] font-bold leading-[46px] text-[#21272A]`;
const FilterBar = tw.div`w-full h-12 shrink-0 flex items-center justify-between `;
const ButtonList = tw.div`h-full flex gap-6`;
const List = tw.div`h-full grid grid-cols-5 grid-rows-2 gap-6`;
const Item = tw.div`bg-pink-200`;
const Title = tw.h2`text-xl font-semibold truncate max-h-[3rem] overflow-hidden`;
const Content = tw.p`text-base max-h-[6.25rem] overflow-hidden`;
const ButtonContainer = tw.div`h-[24px]`;
const AddButton = tw.div`flex gap-2 text-[#0F62FE] cursor-pointer`;

interface ButtonProps {
  isActive: boolean;
}

const Button = styled.div<ButtonProps>(({ isActive }) => [
  tw`h-full flex items-center text-[#21272A] font-semibold cursor-pointer`,
  isActive && tw`text-[#001D6C] border-b-2 border-[#001D6C]`,
]);

const NoteFilter = () => {
  const [activeButton, setActiveButton] = useState("all");

  return (
    <NoteContentWrapper>
      <HeaderBar>
        <Headding>Dashboard</Headding>
        <AddButton>
          <Plus />
          <p>New Note</p>
        </AddButton>
      </HeaderBar>

      <FilterBar>
        <ButtonList>
          <Button
            isActive={activeButton === "all"}
            onClick={() => setActiveButton("all")}
          >
            All
          </Button>
          <Button
            isActive={activeButton === "pinned"}
            onClick={() => setActiveButton("pinned")}
          >
            Pinned
          </Button>
          <Button
            isActive={activeButton === "draft"}
            onClick={() => setActiveButton("draft")}
          >
            Draft
          </Button>
        </ButtonList>
        <input />
      </FilterBar>
      <List>
        <Item>
          <Title>Item Title</Title>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            lacinia arcu non sapien gravida, eget cursus nulla tempus. Integer
            sodales scelerisque metus, ac bibendum dui venenatis nec.
          </Content>
          <ButtonContainer />
        </Item>
        <Item>
          <Title>Item Title</Title>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            lacinia arcu non sapien gravida, eget cursus nulla tempus. Integer
            sodales scelerisque metus, ac bibendum dui venenatis nec.
          </Content>
          <ButtonContainer />
        </Item>
      </List>
    </NoteContentWrapper>
  );
};

export default NoteFilter;
