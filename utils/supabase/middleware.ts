import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session if expired
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // Redirect to sign-in if user is not authenticated and trying to access protected routes
    if (request.nextUrl.pathname.startsWith("/protected") && authError) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Redirect to home if user is authenticated and tries to access the root page
    if (request.nextUrl.pathname === "/" && !authError) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    // Check if the user is trying to access the /turfadd page
    if (request.nextUrl.pathname.startsWith("/turfadd")) {
      if (authError) {
        // Redirect to sign-in if the user is not authenticated
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Fetch the user's role from the `users` table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user?.id)
        .single();

      if (userError || !userData || userData.role !== "admin") {
        // Redirect to home page if the user is not an admin
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return response;
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
