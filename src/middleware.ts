import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // console.log(req.url);
  // console.log(req.nextUrl);
  // console.log(req.nextUrl.origin);
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const { data } = await supabase.auth.getSession();
  if (
    !data.session &&
    !req.nextUrl.pathname.startsWith("/login") &&
    !(req.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (data.session && req.nextUrl.pathname.startsWith("/login")) {
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
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
