"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zustandStore } from "@/lib/zustandStore";
import { useEffect } from "react";

const NavBar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const loggedIn = zustandStore((state) => state.loggedIn);
  const changeLoggedIn = zustandStore((state) => state.changeLoggedIn);
  console.log(loggedIn);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("세션은", data.session);
      console.log(!!data.session);
      changeLoggedIn(!!data.session);
    };
    fetchSession();
  }, [supabase.auth, changeLoggedIn]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    changeLoggedIn(false);
    router.refresh();
  };

  const goToLoginpage = () => {
    router.push("/login");
  };

  return loggedIn ? (
    <button onClick={handleSignOut}>로그아웃</button>
  ) : (
    <button onClick={goToLoginpage}>로그인</button>
  );
};

export default NavBar;
