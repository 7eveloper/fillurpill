"use client";

import GoTopBtn from "@/components/product/GoTopBtn";
import ProductList from "@/components/product/ProductList";
import SearchBar from "@/components/product/SearchBar";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { ClipLoader } from "react-spinners";

const ProductListPage = () => {
  const {
    data = [],
    isFetching,
    hasNextPage,
    pageEnd,
    searchType,
    handleChangeType,
  } = useQueryProduct();

  return (
    <>
      <section className="max-w-[1360px] w-full mx-auto">
        <SearchBar
          searchType={searchType}
          handleChangeType={handleChangeType}
        />
        <ProductList data={data} />
        <div className="py-10 text-center" ref={pageEnd}>
          {isFetching ? (
            <ClipLoader color="#36d7b7" className="mx-1" />
          ) : hasNextPage ? (
            "더보기"
          ) : (
            "다음 페이지가 없습니다"
          )}
        </div>
      </section>
      <GoTopBtn />
    </>
  );
};

export default ProductListPage;
