"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zustandStore } from "@/store/zustandStore";
import { useEffect } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

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

  const goToHomePage = () => {
    router.push("/");
  };

  const goToLoginPage = () => {
    router.push("/login");
  };
  const goToCommunity = () => {
    router.push("/community");
  };

  const goToMypagePage = () => {
    router.push("/mypage");
  };

  return (
    // <div className="flex     ">
    <nav className="flex px-2 h-16 text-[19px] items-center justify-between ml-4 mr-6">
      <div className="flex gap-8">
        <button className="hover:text-gray-600" onClick={goToHomePage}>
          로고
        </button>
        <button className="hover:text-gray-600" onClick={goToCommunity}>
          Community
        </button>
        <button className="hover:text-gray-600" onClick={goToMypagePage}>
          Mypage
        </button>
        <button className="hover:text-gray-600">About</button>
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
