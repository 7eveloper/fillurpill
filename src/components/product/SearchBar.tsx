import { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchBarType = {
  searchType: string;
  handleChangeType: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const searchTypes = [
  {
    value: "function",
    label: "기능",
  },
  {
    value: "name",
    label: "이름",
  },
  {
    value: "raw_materials",
    label: "성분",
  },
];

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
      className="flex items-center gap-2 h-10 max-w-[600px] text-muted-foreground rounded-xl border border-input bg-transparent px-4 py-6 shadow-sm transition-colors my-10 "
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
      <select onChange={handleChangeType} className="bg-transparent">
        {searchTypes.map((type) => {
          return (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          );
        })}
      </select>
      <input
        name="search"
        placeholder="검색어를 입력해주세요"
        className="flex-1 outline-none bg-transparent"
        autoFocus={true}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchBar;
