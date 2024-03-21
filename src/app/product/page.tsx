"use client";

import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/product/SearchBar";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ProductListPage = () => {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const [searchType, setSearchType] = useState(params.get("type") ?? "");

  const { data, isFetchingNextPage, pageEnd } = useQueryProduct(query);

  return (
    <section>
      <h1>전체 제품</h1>
      <SearchBar />
      <ProductList data={data} />
      <div ref={pageEnd}>더보기</div>
      {isFetchingNextPage ? <div>loading</div> : null}
    </section>
  );
};

export default ProductListPage;
