"use client";

import { useInput } from "@/hooks/customhook";
import { zustandStore } from "@/lib/zustandStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail, clearEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const changeLoggedIn = zustandStore((state) => state.changeLoggedIn);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        // user가 이메일 확인 완료 후에는 "http://localhost:3000/auth/callback"(=백엔드 서버)로 세션 받으러가라 리디렉션 시키기
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
    clearEmail();
    clearPassword();
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.session) {
      router.refresh();
      clearEmail();
      clearPassword();
      alert("로그인에 성공했습니다.");
      changeLoggedIn(!!data.session);
      router.push("/");
    }

    if (error) alert("로그인 오류");
  };

  return (
    <main>
      <div>
        <div>
          LoginPage
          <input type="email" value={email} onChange={setEmail}></input>
          <input
            type="password"
            value={password}
            onChange={setPassword}
          ></input>
        </div>
        <div>
          <button onClick={handleSignIn}>로그인</button>
          <button onClick={handleSignUp}>회원가입</button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
