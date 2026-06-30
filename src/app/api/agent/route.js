import { streamChatWithBuzz } from '@/lib/gemini';

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // If no Gemini key, return a helpful mock response
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({
        content: "🤖 Buzz is almost ready! Add your GEMINI_API_KEY to .env.local to activate me. I'll be your personal PM coach — ask me anything about product management, frameworks, metrics, or practice case studies.",
      });
    }

    try {
      const stream = await streamChatWithBuzz(messages);
      let fullText = '';

      for await (const chunk of stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
      }

      return Response.json({ content: fullText });
    } catch (aiError) {
      console.error('Gemini API error:', aiError);
      return Response.json({
        content: "I'm having trouble connecting right now. Please check your API key and try again.",
      });
    }
  } catch (error) {
    console.error('Agent route error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
