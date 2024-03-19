import { getPostById } from "@/utils/get-post-by-id";
import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";

const usePostQuery = (id: number) => {
  const client = useSupabase();
  const queryKey = ["posts"];

  const queryFn = async () => {
    return getPostById(client, id).then((result) => result.data);
  };
  return useQuery({ queryKey, queryFn });
};

export default usePostQuery;
