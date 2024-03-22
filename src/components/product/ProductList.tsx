"use client";

import { SearchData } from "@/hooks/useQueryProduct";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

const ProductList = ({ data = [] }: { data: SearchData }) => {
  const router = useRouter();

  const handleClickDetail = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {data.map((item) => (
        <Card
          key={item.id}
          className="w-80 min-h-[500px] cursor-pointer overflow-hidden"
          onClick={() => handleClickDetail(item.id)}
        >
          {item.image ? (
            <img
              src={item.image as string}
              className="w-80 h-[300px] border-b-2"
            />
          ) : (
            <div className="w-80 min-h-[300px] bg-slate-50 border-b-2"></div>
          )}

          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>{item.company}</CardContent>
        </Card>
      ))}
    </ul>
  );
};

export default ProductList;
