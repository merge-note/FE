import React from "react";
import NewsList from "./NewsList";
import styles from "@/styles/searchStyle.module.scss";

type Source = {
  id: string | null;
  name: string;
};

type Article = {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type ArticleListProps = {
  articles: Article[];
};

const NewsContainer = ({ articles }: ArticleListProps) => {
  return (
    <div className="w-full h-full flex flex-col px-3">
      <div className="h-full bg-white px-4 md:px-0 drop-shadow-sm lg:drop-shadow-xl flex flex-col items-center">
        <div className="w-full h-32 px-5 py-3">
          <p className="text-2xl lg:text-4xl font-semibold">Top 10 headlines</p>
          <p className="text-sm lg:text-lg lg:mt-2">
            Headlines are updated every hour.
          </p>
        </div>
        <div
          className={`${styles["hide-scrollbar"]} h-[calc(100%_-_8rem)] overflow-y-scroll p-3 grid gap-y-8`}
        >
          <NewsList articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
