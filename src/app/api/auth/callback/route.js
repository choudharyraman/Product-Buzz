import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = await cookies();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://smrimdqkcgwewlqzrvkn.supabase.co';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtcmltZHFrY2d3ZXdscXpydmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODM5MjMsImV4cCI6MjA5ODQ1OTkyM30.h6_9v0LMsy90QPVjR75NNA2q-Kli5NcAeurnCdMINps';
    
    const supabase = createServerClient(
      url,
      key,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const flow = searchParams.get('flow');
      
      if (flow === 'login') {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Check if profile exists and wasn't just created (within last 10 seconds)
          const { data: profile } = await supabase
            .from('profiles')
            .select('created_at')
            .eq('id', user.id)
            .single();
            
          const isNewUser = !profile || (new Date() - new Date(profile.created_at) < 10000);
          if (isNewUser) {
            // Delete user or just sign out and redirect to sign up
            await supabase.auth.signOut();
            return NextResponse.redirect(`${origin}/login?error=account_not_found`);
          }
        }
      }
      
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
