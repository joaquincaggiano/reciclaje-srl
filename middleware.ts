import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("SESSION",session)

  if (session === null) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/products", "/admin/services", "/admin/blog", "/admin/users"],
};
