import React from "react";
import Sections from "@/components/LandingPage/Sections";
import Header from "@/components/LandingPage/Header";

const index = () => {
  return (
    <div className="h-fit flex flex-col">
      <Header />
      <Sections />
    </div>
  );
};

export default index;
