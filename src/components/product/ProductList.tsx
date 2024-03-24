"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import ProgressiveImg from "./ProgressiveImg";

const ProductList = ({ data }: { data: Product[] }) => {
  const router = useRouter();

  const handleClickDetail = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((item) => (
        <Card
          key={item.id}
          className="max-w-80 max-h-[500px] h-full cursor-pointer overflow-hidden hover:scale-105 transition-transform"
          onClick={() => handleClickDetail(item.id)}
        >
          {item.image ? (
            <ProgressiveImg src={item.image as string} />
          ) : (
            <div className="w-80 min-h-[300px] bg-slate-50 border-b-2"></div>
          )}

          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>{item.company}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
