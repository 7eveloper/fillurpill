"use client";

import { useInput } from "@/hooks/customhook";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail, clearvEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const router = useRouter();

  const supabase = createClientComponentClient();

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
    clearvEmail();
    clearPassword();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
    clearvEmail();
    clearPassword();
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
