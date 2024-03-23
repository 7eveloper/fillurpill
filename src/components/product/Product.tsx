import { Product } from "@/lib/types";
import Link from "next/link";

const Product = ({ product }: { product: Product }) => {
  return (
    <>
      {product.image && <img src={product.image} className="w-[320px] h-fit" />}
      <div>
        <h2 className="font-bold text-xl">{product.name}</h2>
        <p>제조/수입사: {product.company}</p>
        <p>유통기한: {product.expiration_date}</p>
        <p>섭취방법 : {product.taking_guide}</p>
        <p>주의사항 : {product.caution}</p>
        <p>주요 기능 : {product.function}</p>
        <p>성분/함량: {product.raw_materials}</p>
        {product.link && <Link href={product.link}>구매 링크</Link>}
      </div>
    </>
  );
};

export default Product;
