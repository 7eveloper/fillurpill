import { fetchData } from "@/lib/queries/fetchData";
import { useInfiniteQuery } from "@tanstack/react-query";

const SearchResult = ({ keyword }: { keyword: string }) => {
  const {
    data = [],
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["product"],
    queryFn: ({ pageParam }) => fetchData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return null;
      return allPages.length + 1;
    },
    select: (data) => {
      return data.pages.flat();
    },
  });

  const handleMorePage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-10">
        {data.map((item) => (
          <li key={item.id} className="w-80 border rounded-md min-h-[500px]">
            {item.image && <img src={item.image} />}
            <h3>{item.name}</h3>
            <span>{item.company}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleMorePage}>더보기</button>
    </>
  );
};

export default SearchResult;
