import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import User from "../../public/icons/User.svg";
import Home from "../../public/icons/Home.svg";
import Plus from "../../public/icons/Plus.svg";
import Trash from "../../public/icons/Trash.svg";
import Newspaper from "../../public/icons/Newspaper.svg";
import Logout from "../../public/icons/Logout.svg";

const Container = tw.nav`w-20 h-full px-4 py-6 shrink-0 gap-4 flex flex-col items-center bg-[#F2F4F8] border border-r-[#DDE1E6]`;
const Circle = tw.div` w-12 h-12 rounded-full bg-[#fff] flex items-center justify-center`;
const MenuList = tw.div`h-full flex flex-col justify-between`;
const TopItems = tw.div`flex flex-col gap-6 mt-2`;

interface IconProps {
  isSelected: boolean;
}

const Icon = styled.svg<IconProps>`
  cursor: pointer;
  ${({ isSelected }) => isSelected && "fill: #001D6C;"}
`;

const VerticalNav = () => {
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  return (
    <Container>
      <Circle>
        <User />
      </Circle>
      <MenuList>
        <TopItems>
          <Icon
            as={Home}
            isSelected={selectedIcon === "home"}
            onClick={() => handleIconClick("home")}
          />
          <Icon
            as={Plus}
            isSelected={selectedIcon === "plus"}
            onClick={() => handleIconClick("plus")}
          />
          <Icon
            as={Newspaper}
            isSelected={selectedIcon === "Newspaper"}
            onClick={() => handleIconClick("Newspaper")}
          />
          <Icon
            as={Trash}
            isSelected={selectedIcon === "trash"}
            onClick={() => handleIconClick("trash")}
          />
        </TopItems>
        <Icon
          as={Logout}
          isSelected={selectedIcon === "logout"}
          onClick={() => handleIconClick("logout")}
        />
      </MenuList>
    </Container>
  );
};

export default VerticalNav;
