"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import usePostStore from "@/store/postStore";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductImage, setSelectedProductImage] = useState<
    string | undefined
  >("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const addPost = usePostStore((state) => state.addPost);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!ingredient) {
      alert("검색어를 입력해주세요.");
      return;
    }
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!rating) {
      alert("별점을 입력해주세요.");
      return;
    }

    const newPost: Partial<Post> = {
      title,
      ingredient,
      content,
      rating,
    };

    setTitle("");
    setIngredient("");
    setContent("");
    setRating("");
    setSelectedProductImage("");
    addPost(newPost);
  };

  const handleProductClick = (productName: string, productImage: string) => {
    setIngredient(productName);
    setSelectedProduct(productName);
    setSelectedProductImage(productImage);
  };
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .like("function", `%${searchKeyword}%`);
      if (error) {
        console.error("검색 오류:", error.message);
        return;
      }

      if (data && data.length > 0) {
        const filteredResult = data.filter((result) =>
          result.function?.includes(searchKeyword)
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

  const handleImageChange = (event: ChangeEvent) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
    }
  };

  return (
    <form
      className="flex-column border-2 p-10 w-2/3 m-4 bg-white"
      onSubmit={handleSubmit}
    >
      <section className="flex m-2">
        <Label htmlFor="제목" className="w-24">
          제목
        </Label>
        <Input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해주세요."
          className="w-96"
        />
      </section>
      <section className="flex m-2">
        <Label htmlFor="추천 영양제" className="w-24">
          추천 영양제
        </Label>
        <Input
          type="text"
          value={ingredient}
          onChange={(event) => setIngredient(event.target.value)}
          placeholder="영양제 이름을 입력해주세요."
          className="w-96"
        />
      </section>
      <section className="flex m-2">
        <Label htmlFor="추천 영양제" className="w-24">
          영양제 검색하기
        </Label>
        <Input
          type="text"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="검색어를 입력해주세요."
          className="w-96"
        />
        <Button onClick={handleSearch} className="mx-2">
          검색
        </Button>
      </section>
      <section className="flex mx-36">
        {searchResults.length > 0 ? (
          <div>
            <Label>&quot;{searchKeyword}&quot;에 대한 검색 결과입니다.</Label>
            <ul>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleProductClick(result.name, result.image)}
                  className="border-2 m-2 hover:scale-110 cursor-pointer"
                >
                  <p className="m-2">제품명 : {result.name}</p>
                  <p className="m-2">기능 : {result.function}</p>
                  {result.image && (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-24 h-24"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>
            {searchResults.length === 0 &&
              searchKeyword &&
              `"${searchKeyword}"에 대한 검색 결과를 확인해보세요.`}
          </p>
        )}
      </section>
      <section className="flex m-2">
        <Label htmlFor="내용" className="w-24">
          추천 이유
        </Label>
        <Input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해주세요."
          className="w-96"
        />
      </section>
      <section className="flex m-2">
        <Label htmlFor="별점" className="w-24">
          별점
        </Label>
        <Select
          value={rating}
          onValueChange={(newValue: string) => setRating(newValue)}
        >
          <SelectTrigger className="w-96">
            <SelectValue placeholder="∇"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      <section className="flex m-2">
        <Label htmlFor="이미지" className="w-24">
          이미지
        </Label>
        <input
          type="file"
          onChange={(event) => handleImageChange(event)}
          accept="image/*"
          className="w-96"
        />
      </section>
      <Button type="submit">등록하기</Button>
    </form>
  );
};

export default PostForm;
