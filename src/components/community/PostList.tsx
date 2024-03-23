"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import usePostStore from "@/store/postStore";
import type { Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { isThereClientSession } from "@/hooks/clientSession";

const PostList = () => {
  const { posts, isLoading, isError, fetchPostData, deletePost, editPost } =
    usePostStore();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editedPost, setEditedPost] = useState<Partial<Post>>({
    title: "",
    ingredient: "",
    content: "",
    rating: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPostData();
    const fetchCurrentUser = async () => {
      const { supabase, user } = await isThereClientSession();
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, [fetchPostData]);

  const handleEdit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      if (selectedPost) {
        await editPost(selectedPost.id, editedPost);
        fetchPostData();
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("게시글 수정 오류", error);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      fetchPostData();
    } catch (error) {
      console.error("게시글 삭제 오류", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !posts) {
    return <div>Error: {isError}</div>;
  }

  return (
    <section className="grid grid-cols-4 gap-8 m-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-[24rem] bg-white rounded-lg shadow-lg"
        >
          {post.image && (
            <div className="w-full h-48 overflow-hidden rounded-t-lg">
              <img
                src={post.image}
                alt="이미지"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2">"{post.ingredient}"를(을) 추천합니다.</p>
            <p className="mt-2">{post.content}</p>
            <p className="mt-2">⭐️ {post.rating}</p>
            <div className="flex mt-4">
              {currentUser && currentUser.id === post.user_id && (
                <>
                  <Button
                    onClick={() => {
                      setSelectedPost(post);
                      setEditedPost({
                        title: post.title,
                        ingredient: post.ingredient,
                        content: post.content,
                        rating: post.rating,
                      });
                      setEditModalOpen(true);
                    }}
                    className="mr-2"
                  >
                    수정
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  >
                    삭제
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      <Dialog
        open={editModalOpen}
        onOpenChange={(isOpen) => setEditModalOpen(isOpen)}
      >
        <DialogTrigger asChild />
        <DialogContent>
          <div>
            <Label htmlFor="title">제목</Label>
            <Input
              type="text"
              id="title"
              value={editedPost.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="ingredient">추천제품</Label>
            <Input
              type="text"
              id="ingredient"
              value={editedPost.ingredient}
              onChange={(e) =>
                setEditedPost({ ...editedPost, ingredient: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="content">내용</Label>
            <Input
              id="content"
              value={editedPost.content}
              onChange={(e) =>
                setEditedPost({ ...editedPost, content: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="별점" className="text-lg w-28">
              별점
            </Label>
            <Select
              value={editedPost.rating}
              onValueChange={(newValue: string) =>
                setEditedPost({ ...editedPost, rating: newValue })
              }
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
          </div>
          <Button onClick={handleEdit}>저장</Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PostList;
