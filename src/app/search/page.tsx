"use client";

import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/search/SearchBar";
import { Input } from "@/components/ui/input";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchProduct } from "@/lib/fetchData";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect } from "react";

const SearchPage = () => {
  const params = useSearchParams();

  const query = params.get("q") ?? "";
  const searchType = params.get("type") ?? "";
  console.log(query, searchType);

  const router = useRouter();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useSearchProduct(query);

  useEffect(() => {
    refetch();
  }, [query]);

  const pageEnd = useInfiniteScroll(hasNextPage, fetchNextPage);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
    router.push(`/search?q=${e.currentTarget.search.value}`);
  };

  return (
    <>
      <h1>전체 제품</h1>
      <SearchBar handleSearch={handleSearch} />
      <ProductList data={data} />
      <div ref={pageEnd}>더보기</div>
      {isFetchingNextPage ? <div>loading</div> : null}
    </>
  );
};

export default SearchPage;
