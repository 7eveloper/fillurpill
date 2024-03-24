"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zustandStore } from "@/store/zustandStore";
import { useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AlertSurveyDemo } from "../../survey/AlertSurveyDemo";
import { alertMsgWithAction } from "@/lib/utils";
import { fetchSurvey, fetchUser } from "@/hooks/fetchDB";

const NavBar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const loggedIn = zustandStore((state) => state.user.loggedIn);
  const surveyDone = zustandStore((state) => state.user.surveyDone);
  const nickname = zustandStore((state) => state.user.nickname);
  const changeLoggedIn = zustandStore((state) => state.changeLoggedIn);
  const changeSurveyDone = zustandStore((state) => state.changeSurveyDone);
  const changeNickname = zustandStore((state) => state.changeNickname);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      changeLoggedIn(!!data.session);

      if (data.session) {
        const surveyResult = await fetchSurvey();
        surveyResult?.length !== 0 && changeSurveyDone(true);
        const userData = await fetchUser();
        changeNickname(userData && userData[0].nickname);
      }
    };

    fetchSession();
  }, [supabase.auth, changeLoggedIn, changeSurveyDone, changeNickname]);

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
            <Link className="hover:text-gray-600" href="/review">
              Review
            </Link>
            <Link className="hover:text-gray-600" href="/about">
              About
            </Link>
            <Link className="hover:text-gray-600" href="/mypage">
              MyPage
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            {loggedIn ? (
              <button
                className="hover:text-gray-600"
                onClick={() => {
                  handleSignOut();
                  alertMsgWithAction("로그아웃", new Date().toLocaleString());
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
