import React from "react";
import QuickMemo from "../QuickMemo/MemoContainer";
import Nav from "./Nav";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col-reverse lg:flex-row justify-between overflow-hidden">
      <Nav />
      <div className="bg-zinc-100 h-[calc(100%_-_4rem)] lg:w-[calc(100%_-_4rem)] lg:h-full flex flex-row">
        {children}
      </div>
      <QuickMemo />
    </div>
  );
};

export default Layout;
