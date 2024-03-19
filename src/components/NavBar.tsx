"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    fetch();
  }, [supabase.auth, isLoggedIn]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const goToLoginpage = () => {
    router.push("/login");
  };

  // if (location.href === "http://localhost:3000/login") {
  //   return null;
  // }

  return isLoggedIn ? (
    <button onClick={handleSignOut}>로그아웃</button>
  ) : (
    <button onClick={goToLoginpage}>로그인</button>
  );
};

export default NavBar;
