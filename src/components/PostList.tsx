"use client";

import React, { useEffect } from "react";
import usePostStore from "@/hook/store";

const PostList = () => {
  const { posts, isLoading, isError, fetchPostData } = usePostStore();

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !posts) {
    return <div>Error: {isError}</div>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Rating: {post.rating}</p>
          <p>Ingredient: {post.ingredient}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
