import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(req);
  const res = NextResponse.next();
  // supabase 클라이언트 만들기
  const supabase = createMiddlewareClient({ req, res });
  // refreshing cookie(session 만료방지)
  await supabase.auth.getSession();
  return res;
}
