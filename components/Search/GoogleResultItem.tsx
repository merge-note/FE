import React from "react";
import { Skeleton } from "@mui/material";
import { openPopUp } from "@/utils/openPopup";

interface GoogleSearchResult {
  cacheId?: string;
  title: string;
  snippet: string;
  link: string;
  formattedUrl: string;
  isLoading?: boolean;
}

const GoogleResult = ({
  title,
  snippet,
  link,
  formattedUrl,
  isLoading,
}: GoogleSearchResult) => {
  const handlePopUp = (link: string) => {
    openPopUp(link);
  };

  return (
    <div
      className="w-full bg-white border-b-2 h-24 px-3 py-2 flex flex-col justify-center cursor-pointer hover:bg-slate-100"
      onClick={() => {
        handlePopUp(link);
      }}
    >
      <p className="text-xs">
        {isLoading ? <Skeleton width={1024} height={24} /> : formattedUrl}
      </p>
      <p className="font-semibold">
        {isLoading ? <Skeleton width={1024} height={24} /> : title}
      </p>
      <p>{isLoading ? <Skeleton width={1024} height={24} /> : snippet}</p>
      <div />
    </div>
  );
};

export default GoogleResult;
