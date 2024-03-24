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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigation } from "next/navigation";

const ReviewForm = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSumitted] = useState(false);

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
      alert("추천하시는 이유를 입력해주세요.");
      return;
    }
    if (!rating) {
      alert("별점을 입력해주세요.");
      return;
    }

    if (!selectedProductImage) {
      alert("검색을 통해 이미지를 추가해주세요.");
      return;
    }

    const newPost: Partial<Post> = {
      title,
      ingredient,
      content,
      rating,
      image: selectedProductImage,
    };

    setTitle("");
    setIngredient("");
    setContent("");
    setRating("");
    setSelectedProductImage("");
    addPost(newPost);
    alert("등록이 완료되었습니다.");
    navigation.navigate("/review");
  };

  const handleProductClick = async (productName: string) => {
    try {
      const { data, error } = await supabase
        .from("hfood")
        .select("image")
        .eq("name", productName)
        .single();

      if (error) {
        console.error("이미지 가져오기 오류", error.message);
        return;
      }

      if (data) {
        setSelectedProduct(productName);
        setSelectedProductImage(data.image);
      }
    } catch (error) {}

    setIngredient(productName);
    setIsModalOpen(false);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("hfood")
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
      setIsModalOpen(true);
    } catch (error) {
      console.error("검색 오류", error);
    }
  };

  return (
    <form
      className="flex flex-col items-center border-2 p-10 w-full h-full max-w-[1200px] max-h-[600px] m-4 bg-white"
      onSubmit={handleSubmit}
    >
      <section className="flex items-center m-2">
        <Label htmlFor="제목" className="text-lg w-28">
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
      <section className="flex items-center m-2">
        <Label htmlFor="추천 영양제" className="text-lg w-28">
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
      {selectedProductImage && (
        <section className="flex items-center m-2">
          <Label htmlFor="이미지" className="text-lg w-28">
            제품 이미지
          </Label>
          <img
            src={selectedProductImage}
            alt="선택한 제품 이미지"
            className="w-24"
          />
        </section>
      )}
      <section className="flex items-center m-2">
        <Label htmlFor="영양제 검색" className="text-lg w-28">
          영양제 검색
        </Label>
        <Input
          type="text"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="검색어를 입력해주세요."
          className="w-80"
        />
        <Dialog
          open={isModalOpen}
          onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
        >
          <DialogTrigger asChild>
            <Button onClick={handleSearch} className="m-2">
              검색
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] max-h-[1000px] overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleProductClick(result.name, result.image)}
                  className="w-full border-2 m-2 cursor-pointer relative"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-full object-cover transition duration-300 filter brightness-100 hover:brightness-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                      <div className="text-center text-white">
                        <Label className="text-2xl mb-2">제품 기능</Label>
                        <p
                          className="overflow-hidden p-3"
                          style={{ maxHeight: "4rem" }}
                        >
                          {result.function}
                        </p>
                        {result.function.split("\n").length > 3 && (
                          <>
                            <p
                              className="text-white cursor-pointer hover:underline mt-2"
                              onClick={(event) => {
                                event.stopPropagation();
                                event.currentTarget.previousSibling.style.maxHeight =
                                  "none";
                                event.currentTarget.style.display = "none";
                                event.currentTarget.nextSibling.style.display =
                                  "block";
                              }}
                            >
                              [더보기]
                            </p>
                            <p
                              className="text-white cursor-pointer hover:underline mt-2 hidden"
                              onClick={(event) => {
                                event.stopPropagation();
                                event.currentTarget.previousSibling.previousSibling.style.maxHeight =
                                  "4rem";
                                event.currentTarget.style.display = "none";
                              }}
                            >
                              [닫기]
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-lg font-semibold">{result.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </DialogContent>
        </Dialog>
      </section>
      <section className="flex items-center m-2">
        <Label htmlFor="내용" className="text-lg w-28">
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
      <section className="flex items-center m-2">
        <Label htmlFor="별점" className="text-lg w-28">
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
      <Button
        type="submit"
        className="flex justify-center items-center w-24 mt-4"
      >
        등록하기
      </Button>
    </form>
  );
};

export default ReviewForm;
