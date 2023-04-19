import React from "react";

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

const NewsList = ({ articles }: ArticleListProps) => {
  if (!articles) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className="w-full h-96 flex">
          <div className="w-1/2 h-96 relative">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="h-96 w-full "
            />
            <div className="bg-white/30 p-2 backdrop-blur-sm absolute top-60">
              <p className="font-bold">By {article.author || "N/A"}</p>
              <p className="text-sm">{article.source.name}</p>
              <p className="text-xs">{article.publishedAt}</p>
            </div>
          </div>
          <div className="w-1/2 text-center p-4 flex flex-col items-center justify-center">
            <div className="mb-4">
              <h1
                className="font-bold text-4xl underline decoration-amber-300 decoration-4 mb-2"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {article.title}
              </h1>
              <p
                className="font-bold"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {article.description}
              </p>
            </div>
            <div>
              <p>{article.content}</p>
              <button className="bg-black text-white p-2 mt-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold"
                >
                  Read more
                </a>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsList;
