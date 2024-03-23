import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Product } from "@/lib/types";

const Product = ({ product }: { product: Product }) => {
  console.log(product);
  return (
    <>
      <div className="flex flex-col gap-4 sm:min-w-[320px]">
        {product.image && (
          <img
            src={product.image}
            className="h-fit rounded-xl border shadow-sm"
          />
        )}
        {product.link && (
          <Link
            className="text-center border p-4 rounded-xl shadow-sm"
            href={product.link}
            target="_blank"
          >
            구매 링크
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">{product.name}</h2>
        <Tabs defaultValue="function" className="">
          <TabsList>
            <TabsTrigger value="function">주요기능</TabsTrigger>
            <TabsTrigger value="taking_guide">섭취방법</TabsTrigger>
            <TabsTrigger value="caution">주의사항</TabsTrigger>
          </TabsList>
          <TabsContent value="function">{product.function}</TabsContent>
          <TabsContent value="taking_guide">{product.taking_guide}</TabsContent>
          <TabsContent value="caution">{product.caution}</TabsContent>
        </Tabs>
        <p>성분/함량: {product.raw_materials}</p>
      </div>
    </>
  );
};

export default Product;
