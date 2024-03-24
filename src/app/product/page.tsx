"use client";

import GoTopBtn from "@/components/GoTopBtn";
import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/product/SearchBar";
import SkeletonList from "@/components/product/SkeletonList";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const ProductListPage = () => {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const searchType = params.get("type") ?? "function";

  const {
    data = [],
    isFetching,
    hasNextPage,
    refetch,
    pageEnd,
  } = useQueryProduct(query, searchType);

  useEffect(() => {
    refetch();
  }, [searchType]);

  return (
    <>
      <section className="w-full mx-auto">
        <SearchBar searchType={searchType} />
        <ProductList data={data} />

        <div className="text-center" ref={pageEnd}>
          {isFetching ? (
            <>
              <SkeletonList />
            </>
          ) : hasNextPage ? (
            <div className="py-[200px]">더보기</div>
          ) : (
            <div className="py-[200px]">다음 페이지가 없습니다.</div>
          )}
        </div>
      </section>
      <GoTopBtn />
    </>
  );
};

const SuspensedPage = () => {
  <Suspense>
    <ProductListPage />
  </Suspense>;
};

export default SuspensedPage;
