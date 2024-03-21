"use client";
import ProductList from "@/components/product/ProductList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryProduct } from "@/lib/fetchData";

const ProductPage = () => {
  const {
    data = [],
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useQueryProduct();

  const pageEnd = useInfiniteScroll(hasNextPage, fetchNextPage);

  return (
    <>
      <h1>전체 제품</h1>
      <ProductList data={data} />
      <div ref={pageEnd}>더보기</div>
      {isFetchingNextPage ? <div>loading</div> : null}
    </>
  );
};

export default ProductPage;
