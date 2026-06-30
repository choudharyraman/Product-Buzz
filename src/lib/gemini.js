import { GoogleGenerativeAI } from '@google/generative-ai';

const PM_SYSTEM_PROMPT = `You are Buzz, an expert PM Coach embedded in Product Buzz — a daily learning platform for Product Managers.

Your role:
- Help aspiring, early-stage, and transitioning Product Managers learn and grow
- Answer questions about product management frameworks, metrics, strategy, and career
- Give concise, actionable, and insightful answers — not vague corporate speak
- When relevant, give real-world examples from known products (Slack, Notion, Zomato, etc.)
- You can generate guesstimate questions, quiz the user on frameworks, and explain concepts
- Keep responses focused — this is a learning tool, not a chatbot for general questions
- Tone: Smart, warm, direct — like a senior PM mentor at a top startup

Product Management domains you cover:
- Product strategy & vision
- Metrics & analytics (DAU, MAU, LTV, CAC, NPS, etc.)
- Frameworks (RICE, JTBD, North Star, HEART, OKRs, etc.)
- User research & discovery
- Prioritization techniques
- GTM strategy
- PM interviews & career advice
- Guesstimate & case study practice

Always be helpful, specific, and concise. If asked about topics unrelated to product management, gently redirect.`;

let genAI;

function getGenAI() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

export async function chatWithBuzz(messages) {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: PM_SYSTEM_PROMPT,
  });

  // Convert our message format to Gemini format
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  const lastMessage = messages[messages.length - 1];

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage.content);
  const response = await result.response;

  return response.text();
}

export async function streamChatWithBuzz(messages) {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: PM_SYSTEM_PROMPT,
  });

  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  const lastMessage = messages[messages.length - 1];

  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(lastMessage.content);

  return result.stream;
}

export const SUGGESTED_PROMPTS = [
  '🧮 Give me a guesstimate question',
  '📐 Explain the RICE framework with an example',
  '📊 What metrics should I track for a marketplace?',
  '🎯 How do I write a good North Star Metric?',
  '💡 Quiz me on Jobs-to-be-Done framework',
  '🔍 What\'s the difference between DAU and WAU?',
  '🚀 How do I approach a PM interview case study?',
  '📈 Explain Customer LTV in simple terms',
];
