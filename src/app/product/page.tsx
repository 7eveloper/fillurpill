"use client";

import SearchResult from "@/components/search/SearchResult";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") ?? "";

  return (
    <>
      <h1>{keyword} 검색 결과</h1>
      <div>SearchPage</div>
      <SearchResult keyword={keyword} />
    </>
  );
};

export default SearchPage;
