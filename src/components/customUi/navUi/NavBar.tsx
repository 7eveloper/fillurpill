"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zustandStore } from "@/store/zustandStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { toast } from "sonner";
import { AlertSurveyDemo } from "../../survey/AlertSurveyDemo";

const NavBar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const loggedIn = zustandStore((state) => state.loggedIn);
  const changeLoggedIn = zustandStore((state) => state.changeLoggedIn);
  const changeSurveyDone = zustandStore((state) => state.changeSurveyDone);
  const surveyDone = zustandStore((state) => state.surveyDone);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      changeLoggedIn(!!data.session);
      const { data: surveyResult, error } = await supabase
        .from("survey")
        .select("*")
        .eq("user_id", data.session?.user.id);
      surveyResult && changeSurveyDone();
      data.session && setNickname(data.session.user.user_metadata.nickname);
    };
    fetchSession();
  }, [supabase.auth, changeLoggedIn, changeSurveyDone]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    changeLoggedIn(false);
    router.refresh();
  };

  const goToLoginPage = () => {
    router.push("/login");
  };

  return (
    <>
      <nav className="flex flex-col px-2 py-5 h-fit text-[19px] items-center justify-between mx-8">
        <div className="flex w-full justify-between">
          {/*  */}
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

          <div className="flex gap-4 items-center">
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
        </div>
      </nav>
      <div>
        {!loggedIn ? null : surveyDone ? null : (
          <AlertSurveyDemo nickname={nickname} />
        )}
      </div>
    </>
  );
};

export default NavBar;
