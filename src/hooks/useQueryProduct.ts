"use client";
import { PAGINATE, fetchData } from "@/lib/fetchData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

export const useQueryProduct = (query: string, searchType: string) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["search"],
      queryFn: ({ pageParam }) => fetchData(pageParam, query, searchType),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGINATE) return null;
        return allPages.length + 1;
      },
      select: (data) => {
        return data.pages.flat();
      },
    });

  useEffect(() => {
    refetch();
  }, [query, searchType]);

  const pageEnd = useInfiniteScroll(hasNextPage, fetchNextPage);
  return { data, isFetchingNextPage, hasNextPage, pageEnd };
};

export type SearchData = ReturnType<typeof useQueryProduct>["data"];
