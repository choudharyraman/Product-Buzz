import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://smrimdqkcgwewlqzrvkn.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtcmltZHFrY2d3ZXdscXpydmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODM5MjMsImV4cCI6MjA5ODQ1OTkyM30.h6_9v0LMsy90QPVjR75NNA2q-Kli5NcAeurnCdMINps';
  
  return createBrowserClient(url, key);
}
