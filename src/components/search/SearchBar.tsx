"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Input } from "../ui/input";
import { useQueryClient } from "@tanstack/react-query";

const SearchBar = ({ keyword }: { keyword: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["search"] });
    router.replace(`/product/${e.currentTarget.search.value}`);
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
