"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zustandStore } from "@/store/zustandStore";
import { useEffect } from "react";
import SurveyDrawerBtn from "@/app/survey/survey-action/SurveyDrawerBtn";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { toast } from "sonner";

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
    <nav className="flex px-2 py-5 h-fit text-[19px] items-center justify-between mx-8">
      <div className="flex gap-8 items-center">
        <Link className="hover:text-gray-600" href="/">
          <img
            src="/images/logo-small.png"
            alt="logo"
            className="w-[50px] cursor-pointer"
          />
        </Link>
        <Link className="hover:text-gray-600" href="/">
          Home
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

      <div className="flex gap-4">
        {loggedIn ? (
          <button
            className="hover:text-gray-600"
            onClick={() => {
              handleSignOut();
              toast("로그아웃", {
                description: new Date().toLocaleString(),
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              });
            }}
          >
            Logout
          </button>
        ) : (
          <button className="hover:text-gray-600" onClick={goToLoginPage}>
            Login
          </button>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
