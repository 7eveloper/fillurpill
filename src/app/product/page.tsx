"use client";

import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/product/SearchBar";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

const ProductListPage = ({}) => {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const [searchType, setSearchType] = useState(
    params.get("type") ?? "function"
  );

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSearchType(e.target.value);
  };

  const { data, isFetchingNextPage, pageEnd } = useQueryProduct(
    query,
    searchType
  );

  return (
    <section className="max-w-[1360px] mx-auto">
      <SearchBar searchType={searchType} handleChangeType={handleChangeType} />
      <ProductList data={data} />
      <div ref={pageEnd}>더보기</div>
      {isFetchingNextPage ? <div>loading</div> : null}
    </section>
  );
};

export default ProductListPage;
