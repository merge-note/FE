import React from "react";
import { Skeleton } from "@mui/material";
import { openPopUp } from "@/utils/openPopup";

interface ExtractYoutubeResult {
  etag: string;
  videoId: string;
  channelTitle: string;
  title: string;
  description: string;
  thumbnail: string;
  pageInfo?: { pageCount: number; nextPageToken: string };
  isLoading?: boolean;
}

const YoutubeResult = ({
  videoId,
  channelTitle,
  description,
  title,
  thumbnail,
  pageInfo,
  isLoading,
}: ExtractYoutubeResult) => {
  const handleVideoClick = () => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    openPopUp(videoUrl);
  };

  return (
    <div className="h-64 w-64 bg-gray-100 border-[2px] cursor-pointer">
      <div className="w-full h-4/5" onClick={handleVideoClick}>
        {isLoading ? (
          <Skeleton variant="rectangular" width={254} height={203} />
        ) : (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-full bg-slate-100"
          />
        )}
      </div>
      <div className="h-1/5 flex flex-col bg-white px-2 py-1">
        <p className="font-semibold overflow-hidden text-overflow whitespace-nowrap truncate w-full ">
          {isLoading ? <Skeleton /> : title}
        </p>
        <p className="overflow-hidden text-overflow whitespace-nowrap hidden md:block">
          {isLoading ? <Skeleton /> : channelTitle}
        </p>
      </div>
    </div>
  );
};

export default YoutubeResult;
