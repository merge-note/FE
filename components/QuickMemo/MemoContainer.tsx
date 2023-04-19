import React, { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MemoForm from "./MemoForm";
import QuickMemoList from "./MemoList";
import Cookies from "js-cookie";
import {
  isMemoFormVisibleAtom,
  isCollapsedAtom,
  memoSearchQueryAtom,
  currentPageNumberAtom,
  memoModeAtom,
} from "@/atoms/quickMemoAtoms";

const QuickMemo = () => {
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);
  const [isMemoFormVisible, setIsMemoFormVisible] = useAtom(
    isMemoFormVisibleAtom
  );
  const [memoMode, setMemoMode] = useAtom(memoModeAtom);

  const setCurrentPageNumber = useSetAtom(currentPageNumberAtom);
  const setSearchQuery = useSetAtom(memoSearchQueryAtom);

  const router = useRouter();

  const handleResetPage = () => {
    setCurrentPageNumber(1);
    setSearchQuery("");
  };

  useEffect(() => {
    const savedToggleState = Cookies.get("toggleState");
    if (savedToggleState) {
      setIsCollapsed(savedToggleState === "true");
    }
  }, []);

  const handleCollapse = () => {
    const newToggleState = !isCollapsed;
    setIsCollapsed(newToggleState);
    Cookies.set("toggleState", newToggleState.toString());
  };

  const toggleState = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState((prev) => !prev);
  };

  return (
    <motion.div
      initial={{
        width: Cookies.get("toggleState") === "true" ? "4rem" : "36rem",
      }}
      animate={{ width: isCollapsed ? "4rem" : "36rem" }}
      transition={{ duration: 0.8 }}
      className="p-3 lg:flex flex-col bg-white w-full h-full hidden"
    >
      <div className="h-16 relative ">
        <div className={`h-7 flex flex-start ${isCollapsed ? "w-16" : ""}`}>
          <motion.div
            className="flex justify-center items-center"
            initial={{
              rotate: Cookies.get("toggleState") === "true" ? "0deg" : "180deg",
            }}
            animate={{ rotate: !isCollapsed ? "180deg" : "0deg" }}
          >
            <ArrowForwardIosRoundedIcon
              className="cursor-pointer"
              onClick={() => {
                handleCollapse();
              }}
            />
          </motion.div>
        </div>
        {!isCollapsed && (
          <div
            className="absolute top-[14px] w-full h-9 text-center flex justify-center items-center cursor-pointer"
            onClick={handleResetPage}
          >
            <h1 className="font-semibold text-2xl">Quick Memo</h1>
          </div>
        )}
      </div>
      {!isCollapsed && (
        <div className=" h-[calc(100%-4rem)] flex flex-col rounded-md">
          {isMemoFormVisible ? (
            <MemoForm
              mode={memoMode}
              handleMemoFormVisible={() => {
                toggleState(setIsMemoFormVisible);
              }}
            />
          ) : (
            <QuickMemoList
              handleMemoFormVisible={() => {
                toggleState(setIsMemoFormVisible);
              }}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default QuickMemo;
