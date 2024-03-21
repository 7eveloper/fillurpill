import { ChangeEvent, FormEvent } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

type SearchBarType = {
  searchType: string;
  handleChangeType: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SearchBar = ({ searchType, handleChangeType }: SearchBarType) => {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/product?q=${e.currentTarget.search.value}&type=${searchType}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-wrap justify-center my-10"
    >
      <select onChange={handleChangeType}>
        <option value="function">기능으로 검색</option>
        <option value="name">이름으로 검색</option>
      </select>
      <Input name="search" placeholder="검색내용" />
      <button>검색</button>
    </form>
  );
};

export default SearchBar;
