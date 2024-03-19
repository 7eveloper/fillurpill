"use client";
import usePostQuery from "@/hook/use-post-query";

const CommunityPage = () => {
  const { data: posts, isLoading, isError } = usePostQuery(id);
  if (isLoading) {
    return <div>Loading 중...</div>;
  }
  if (isError || !posts) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>CommunityPage</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>평점: {post.rating}</p>
          <p>성분: {post.ingredient}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
