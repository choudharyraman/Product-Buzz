import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isSupabaseConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://');

  let user = null;
  let supabaseResponse = NextResponse.next({ request });

  if (isSupabaseConfigured) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
              supabaseResponse = NextResponse.next({ request });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();
      user = supabaseUser;
    } catch (e) {
      console.warn('Failed to get Supabase user in proxy, falling back to guest mode:', e);
    }
  } else {
    // Developer Mock Mode (Bypasses Supabase so app can run immediately)
    const mockUserCookie = request.cookies.get('product_buzz_mock_user');
    if (mockUserCookie) {
      try {
        user = JSON.parse(mockUserCookie.value);
      } catch {
        user = { email: 'guest@productbuzz.app', name: 'PM Learner' };
      }
    }
  }

  // Protected routes — redirect to login if not authenticated
  const protectedPaths = ['/dashboard', '/hub', '/pm-drill', '/dictionary', '/agent'];
  const isProtectedPath = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtectedPath && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Auth paths — redirect to dashboard if already authenticated
  const authPaths = ['/login', '/signup'];
  const isAuthPath = authPaths.some((p) => pathname.startsWith(p));

  if (isAuthPath && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};
