"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useQueryProduct } from "@/lib/fetchData";

const SearchResult = ({ keyword }: { keyword: string }) => {
  const pageEnd = useRef<HTMLDivElement>(null);

  const {
    data = [],
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useQueryProduct(keyword);

  useEffect(() => {
    if (hasNextPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current as HTMLDivElement);
    }
  }, [hasNextPage]);

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-6">
        {data.map((item) => (
          <Card key={item.id} className="w-80 border rounded-md min-h-[500px]">
            {item.image && <img src={item.image} />}
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>{item.company}</CardContent>
            <CardContent>{item.function}</CardContent>
          </Card>
        ))}
      </ul>
      <div ref={pageEnd}>더보기</div>
      {isFetchingNextPage ? <div>loading</div> : null}
    </>
  );
};

export default SearchResult;
