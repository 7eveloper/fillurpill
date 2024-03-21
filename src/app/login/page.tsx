"use client";
import { AlertAuthResult } from "@/components/customUi/AlertAuthResult";
import { useInput } from "@/hooks/customhook";
import { zustandStore } from "@/store/zustandStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const [loginMode, setLoginMode] = useState(true);
  const [email, setEmail, clearEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const [message, setMessage] = useState<string[]>([]);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const changeLoggedIn = zustandStore((state) => state.changeLoggedIn);

  const handlerLoginMode = () => {
    setLoginMode(!loginMode);
  };

  const clearInput = () => {
    clearEmail();
    clearPassword();
  };

  const handleSignUp = async () => {
    clearInput();
    if (email.length === 0 || password.length === 0) {
      setMessage(["이메일과 비밀번호를 모두 입력해주세요."]);
      return message;
    }
    startTransition(async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // user가 이메일 확인 완료 후에는 "http://localhost:3000/auth/callback"(=백엔드 서버)로 세션 받으러가라 리디렉션 시키기
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (!error) {
        router.refresh();
        setMessage([
          "Fill ur Pill의 회원이 되신 걸 환영합니다.",
          "이메일에서 회원가입을 완료해주세요:)",
        ]);
      } else {
        setMessage(["회원가입 과정에 오류가 발생했습니다."]);
      }
      return message;
    });
  };

  const handleSignIn = async () => {
    clearInput();
    if (email.length === 0 || password.length === 0) {
      setMessage(["이메일과 비밀번호를 모두 입력해주세요."]);
      return message;
    }
    startTransition(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data?.session) {
        router.refresh();
        changeLoggedIn(!!data.session);
        // return message;
      }
      if (error) {
        setMessage(["로그인 과정에 오류가 발생하였습니다."]);
        // return message;
      }
      return message;
    });
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
          {loginMode ? (
            <>
              <AlertAuthResult
                func={handleSignIn}
                text="로그인"
                isPending={isPending}
                message={message}
              />
              <button onClick={handlerLoginMode}>
                아직 회원이 아니신가요?
              </button>
            </>
          ) : (
            <>
              <AlertAuthResult
                func={handleSignUp}
                text="회원가입"
                isPending={isPending}
                message={message}
              />
              <button onClick={handlerLoginMode}>로그인하러 가기</button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
