"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zustandStore } from "@/store/zustandStore";
import { useEffect } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const loggedIn = zustandStore((state) => state.loggedIn);
  const changeLoggedIn = zustandStore((state) => state.changeLoggedIn);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      changeLoggedIn(!!data.session);
    };
    fetchSession();
  }, [supabase.auth, changeLoggedIn]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    changeLoggedIn(false);
    router.refresh();
  };

  const goToLoginPage = () => {
    router.push("/login");
  };

  return (
    // <div className="flex     ">
    <nav className="flex px-2 h-16 text-[19px] items-center justify-between ml-4 mr-6">
      <div className="flex gap-8">
        <Link className="hover:text-gray-600" href="/">
          로고
        </Link>
        <Link className="hover:text-gray-600" href="/product">
          Product
        </Link>
        <Link className="hover:text-gray-600" href="/community">
          Community
        </Link>
        <Link className="hover:text-gray-600" href="/mypage">
          MyPage
        </Link>
        <Link className="hover:text-gray-600" href="/about">
          About
        </Link>
      </div>
      <div>
        {loggedIn ? (
          <button className="hover:text-gray-600" onClick={handleSignOut}>
            Logout
          </button>
        ) : (
          <button className="hover:text-gray-600" onClick={goToLoginPage}>
            Login
          </button>
        )}
      </div>
    </nav>
    // </div>
  );
};

export default NavBar;
