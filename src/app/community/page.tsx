"use client";
// import usePostQuery from "@/hook/use-post-query";
import useSupabaseBrowser from "@/utils/supabase";
import { getPostById } from "@/utils/get-post-by-id";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

const CommunityPage = ({ params }: { params: { id: number } }) => {
  const supabase = useSupabaseBrowser();
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(getPostById(supabase, params.id));

  if (isLoading) {
    return <div>Loading 중...</div>;
  }
  if (isError || !posts) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>CommunityPage</h1>

      <h2>{posts.title}</h2>
      <p>{posts.content}</p>
      <p>평점: {posts.rating}</p>
      <p>성분: {posts.ingredient}</p>
    </div>
  );
};

export default CommunityPage;
