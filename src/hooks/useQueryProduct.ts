"use client";
import { PAGINATE, fetchData } from "@/lib/fetchData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useQueryProduct = (query: string, searchType: string) => {
  const { ref: pageEnd, inView } = useInView({
    threshold: 1,
  });

  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
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
  }, [query]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return {
    data,
    isFetching,
    hasNextPage,
    refetch,
    pageEnd,
    searchType,
  };
};
