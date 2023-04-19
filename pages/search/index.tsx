import React from "react";
import Layout from "@/components/common/Layout";
import SearchContainer from "@/components/Search/SearchContainer";
import QuickMemo from "@/components/QuickMemo/MemoContainer";

type Props = {};

const index = (props: Props) => {
  return (
    <Layout>
      <SearchContainer />
    </Layout>
  );
};

export default index;
