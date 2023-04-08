import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Hay que traer de la base los title de los productos, servicios y blog

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log("SESSION", session);

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/products",
    "/admin/services",
    "/admin/blog",
    "/admin/users",
    "/admin/products/[title].tsx",
    "/admin/services/[title].tsx",
    "/admin/blog/[title].tsx",
  ],
};
