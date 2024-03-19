"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zustandStore } from "@/lib/zustandStore";

const NavBar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const loggedIn = zustandStore((state) => state.loggedIn);
  const changeLoggedIn = zustandStore((state) => state.changeLoggedIn);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     console.log("세션은", data.session);
  //     console.log(!!data.session);
  //     setIsLoggedIn(!!data.session);
  //   };
  //   fetchSession();
  // }, [supabase.auth, isLoggedIn]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    changeLoggedIn();
    router.refresh();
  };

  // console.log(isLoggedIn);

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
