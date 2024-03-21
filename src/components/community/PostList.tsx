"use client";

import React, { useEffect, useState } from "react";
import usePostStore from "@/store/postStore";
import type { Post } from "@/lib/types";

import Image from "next/image";
import EditModal from "../customUi/EditModal";
import { Button } from "../ui/button";

const PostList = () => {
  const { posts, isLoading, isError, fetchPostData, deletePost, editPost } =
    usePostStore();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  const editHandler = async (postId: number) => {
    try {
      const updatedPost: Partial<Post> = {};
      await editPost(postId, updatedPost);
    } catch (error) {
      console.error("게시글 수정 오류", error);
    }
  };

  const deleteHandler = async (postId: number) => {
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
    <section className="m-2">
      {posts.map((post) => (
        <div key={post.id} className="border-2 m-4">
          <Image src="" alt="이미지"></Image>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>평점: {post.rating}</p>
          <p>성분명: {post.ingredient}</p>
          <Button
            onClick={() => {
              editHandler(post.id);
            }}
            className="m-2"
          >
            수정
          </Button>
          <Button
            onClick={() => {
              deleteHandler(post.id);
            }}
          >
            삭제
          </Button>
        </div>
      ))}
    </section>
  );
};

export default PostList;
