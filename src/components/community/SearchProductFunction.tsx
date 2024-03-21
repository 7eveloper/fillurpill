import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchProductFunction = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchHandler = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .like("product_function", `%${searchKeyword}%`);
      if (error) {
        console.error("검색 오류:", error.message);
        return;
      }

      if (data && data.length > 0) {
        const filteredResult = data.filter((result) =>
          result.product_function?.includes(searchKeyword)
        );
        setSearchResults(filteredResult);
      } else {
        console.log("검색 결과가 없습니다.");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("검색 오류", error);
    }
  };

  return (
    <>
      <section className="flex">
        <Label htmlFor="추천 영양제" className="w-24">
          영양제 검색하기
        </Label>
        <Input
          type="text"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="검색할 성분명을 입력해주세요."
          className="w-96"
        />
        <Button onClick={searchHandler}>검색</Button>
      </section>
      <section>
        {searchResults.length > 0 ? (
          <div>
            <h2>검색 결과</h2>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} className="border-2 m-2">
                  <p className="m-2">제품명 : {result.name}</p>
                  <p className="m-2">기능 : {result.product_function}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>{searchKeyword}에 대한 검색 결과가 없습니다.</p>
        )}
      </section>
    </>
  );
};

export default SearchProductFunction;
