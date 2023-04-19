import React from "react";
import axios from "axios";
import Layout from "@/components/common/Layout";
import NewsContainer from "@/components/NewsPage/NewsContainer";
import { GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_APP_KEY}&pageSize=10`
  );
  const articles = response.data.articles;

  return {
    props: {
      articles,
    },
    revalidate: 3600,
  };
};

const index = ({ articles }: ArticleListProps) => {
  return (
    <Layout>
      <NewsContainer articles={articles} />
    </Layout>
  );
};

export default index;
