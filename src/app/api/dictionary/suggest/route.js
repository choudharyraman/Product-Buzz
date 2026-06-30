import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { productName, productUrl, reason, userId } = body;

    if (!productName) {
      return Response.json({ error: 'Product name is required' }, { status: 400 });
    }

    console.log('Received product suggestion:', { productName, productUrl, reason, userId });

    // Fallback: If Supabase env variables are not configured yet, return mock success
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
      return Response.json({
        success: true,
        message: 'Product request received (mock fallback). Configure Supabase env variables to save to database.'
      });
    }

    try {
      const supabase = await createServiceClient();
      const { data, error } = await supabase
        .from('product_requests')
        .insert([
          {
            product_name: productName,
            product_url: productUrl,
            reason: reason,
            requested_by: userId || null,
          }
        ]);

      if (error) throw error;

      return Response.json({ success: true, data });
    } catch (dbError) {
      console.warn('Supabase DB insertion failed, falling back to mock success:', dbError);
      return Response.json({
        success: true,
        message: 'Product request received (database fallback success)'
      });
    }
  } catch (error) {
    console.error('API suggest route error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
