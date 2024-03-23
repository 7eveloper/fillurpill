"use client";
import { PAGINATE, fetchData } from "@/lib/fetchData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

export const useQueryProduct = () => {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const [searchType, setSearchType] = useState(
    params.get("type") ?? "function"
  );
  const { ref: pageEnd, inView } = useInView();

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

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSearchType(e.target.value);
    refetch();
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return {
    data,
    isFetching,
    hasNextPage,
    pageEnd,
    searchType,
    handleChangeType,
  };
};
