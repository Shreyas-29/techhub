import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const publicRoutes = ["/signin", "/signup"];

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // const session = await getSession({ req });

    // if (!session) {
    //     return NextResponse.redirect(new URL("/signin", req.url));
    // }

    return NextResponse.next();
};

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
