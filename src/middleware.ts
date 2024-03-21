import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const { data } = await supabase.auth.getSession();
  const { data: userResults, error } = await supabase
    .from("survey")
    .select("*")
    .eq("user_id", data.session?.user.id);

  if (
    !data.session &&
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.startsWith("/product") &&
    !(req.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (data.session && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
  if (
    data.session &&
    userResults?.length !== 0 &&
    req.nextUrl.pathname.startsWith("/survey")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  } else {
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths "except for" the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
