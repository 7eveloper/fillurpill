"use client";
import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  hasNextPage: boolean,
  fetchNextPage: () => void
) => {
  const pageEnd = useRef<HTMLDivElement>(null);

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
  return pageEnd;
};
