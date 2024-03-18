"use client";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const client = createClient<Database>(supabaseUrl!, supabaseAnonKey!);

const CommunityPage = async () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [userId, setUserId] = useState("");

  const { isPending, isError, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await client.auth.getUser();
    },
  });

  return <div>CommunityPage</div>;
};

export default CommunityPage;
