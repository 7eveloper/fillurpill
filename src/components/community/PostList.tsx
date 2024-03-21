"use client";

import React, { useEffect, useState } from "react";
import usePostStore from "@/store/postStore";
import type { Post } from "@/lib/types";
import Image from "next/image";
import EditModal from "@/components/customUi/EditModal";
import { Button } from "@/components/ui/button";

const PostList = () => {
  const { posts, isLoading, isError, fetchPostData, deletePost, editPost } =
    usePostStore();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  const handleEdit = async (updatedPost: Partial<Post>) => {
    try {
      if (selectedPost) {
        await editPost(selectedPost.id, updatedPost);
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
    <section className="m-2">
      {posts.map((post) => (
        <div key={post.id} className=" border-2 m-4 bg-white">
          <div className="">
            <Image src="" alt="이미지"></Image>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>평점: {post.rating}</p>
            <p>성분명: {post.ingredient}</p>
          </div>
          <Button
            onClick={() => {
              setSelectedPost(post);
              setEditModalOpen(true);
            }}
            className="m-2"
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
        </div>
      ))}
      {editModalOpen && (
        <EditModal
          initialPost={selectedPost}
          onSave={(editedPost) => {
            handleEdit(editedPost);
          }}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </section>
  );
};

export default PostList;
