import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Product } from "@/lib/types";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const Product = async ({ product }: { product: Product }) => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:min-w-[520px] md:max-w-[520px]">
        {product.image && (
          <img
            src={product.image}
            className="h-fit rounded-xl border shadow-sm"
          />
        )}
      </div>
      <div className="flex flex-col gap-6 leading-relaxed ">
        <span className="text-primary opacity-40">신고번호 {product.id}</span>
        <h2 className="font-bold text-3xl">{product.name}</h2>
        <Tabs defaultValue="function">
          <TabsList className="mb-4">
            <TabsTrigger value="function">주요기능</TabsTrigger>
            <TabsTrigger value="taking_guide">섭취방법</TabsTrigger>
            <TabsTrigger value="caution">주의사항</TabsTrigger>
          </TabsList>
          <TabsContent value="function">{product.function}</TabsContent>
          <TabsContent value="taking_guide">{product.taking_guide}</TabsContent>
          <TabsContent value="caution">{product.caution}</TabsContent>
        </Tabs>
        <p>성분/함량: {product.raw_materials}</p>
        {product.link && (
          <Link
            className="flex items-center justify-center border p-4 rounded-xl shadow-sm hover:bg-muted "
            href={product.link}
            target="_blank"
          >
            구매 링크 <ExternalLinkIcon className="ml-2" />
          </Link>
        )}
      </div>
    </>
  );
};

export default Product;
