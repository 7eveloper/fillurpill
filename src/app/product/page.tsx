"use client";

import GoTopBtn from "@/components/product/GoTopBtn";
import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/product/SearchBar";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

const ProductListPage = () => {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const [searchType, setSearchType] = useState(
    params.get("type") ?? "function"
  );

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSearchType(e.target.value);
  };

  const { data, isFetchingNextPage, hasNextPage, pageEnd } = useQueryProduct(
    query,
    searchType
  );

  return (
    <>
      <section className="max-w-[1360px] mx-auto">
        <SearchBar
          searchType={searchType}
          handleChangeType={handleChangeType}
        />
        <ProductList data={data} />
        <div className="py-10 text-center" ref={pageEnd}>
          {isFetchingNextPage ? <div>loading</div> : null}
          {hasNextPage ? "더보기" : "다음 페이지가 없습니다"}
        </div>
      </section>
      <GoTopBtn />
    </>
  );
};

export default ProductListPage;
