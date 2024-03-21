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
          className="w-80 border rounded-md min-h-[500px]"
          onClick={() => handleClickDetail(item.id)}
        >
          {item.image && <img src={item.image} />}
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>{item.company}</CardContent>
          <CardContent>{item.function}</CardContent>
        </Card>
      ))}
    </ul>
  );
};

export default ProductList;
