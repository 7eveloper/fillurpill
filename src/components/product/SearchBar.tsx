import { FormEvent } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${e.currentTarget.search.value}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-wrap justify-center my-10"
    >
      <Input name="search" placeholder="검색내용" />
      <button>검색</button>
    </form>
  );
};

export default SearchBar;
