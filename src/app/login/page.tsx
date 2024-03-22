"use client";
import { AlertAuthResult } from "@/components/customUi/authUi/AlertAuthResult";
import { useInput } from "@/hooks/customhook";
import { zustandStore } from "@/store/zustandStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const [loginMode, setLoginMode] = useState(true);
  const [email, setEmail, clearEmail] = useInput();
  const [password, setPassword, clearPassword] = useInput();
  const [nickname, setNickname, clearNickname] = useInput();
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
    clearNickname();
  };

  const handleSignUp = async () => {
    clearInput();
    if (email.length === 0) {
      setMessage(["이메일을 입력해주세요."]);
      return message;
    }
    if (password.length === 0) {
      setMessage(["비밀번호를 입력해주세요."]);
      return message;
    }
    startTransition(async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            nickname,
          },
        },
      });
      if (!error) {
        router.refresh();
        setMessage([
          "Fill ur Pill의 회원이 되신 걸 환영합니다.",
          "이메일에서 회원가입을 완료해주세요:)",
        ]);
      } else {
        if (
          error.message ===
          "Password should be at least 6 characters. Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};\\'\\:\"|<>?,./`~."
        ) {
          setMessage([
            "비밀번호는 최소 6자의 대/소문자, 숫자와 특수문자를 포함해야 합니다.",
          ]);
        } else if (
          error.message === "Unable to validate email address: invalid format"
        ) {
          setMessage(["올바른 이메일 형식이 아닙니다."]);
        }
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
      }
      if (error && error.message === "Invalid login credentials") {
        setMessage(["로그인 정보가 올바르지 않습니다."]);
      }
      return message;
    });
  };

  return (
    <>
      <Card className="w-[350px] mx-auto mt-20">
        <CardHeader>
          <CardTitle>로그인 / 회원가입</CardTitle>
          <CardDescription>
            Fill ur Pill의 회원이 되어 건강을 채워보세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Email"
                  required
                  autoFocus
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
              </div>
              {loginMode ? null : (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="nickname">닉네임</Label>
                  <Input
                    type="text"
                    value={nickname}
                    onChange={setNickname}
                    placeholder="닉네임을 입력해주세요"
                  />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {loginMode ? (
            <>
              <button onClick={handlerLoginMode}>
                아직 회원이 아니신가요?
              </button>
              <AlertAuthResult
                func={handleSignIn}
                text="로그인"
                isPending={isPending}
                message={message}
              />
            </>
          ) : (
            <>
              <button onClick={handlerLoginMode}>로그인하러 가기</button>
              <AlertAuthResult
                func={handleSignUp}
                text="회원가입"
                isPending={isPending}
                message={message}
              />
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginPage;
