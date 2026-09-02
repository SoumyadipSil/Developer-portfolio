import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are the AI guide on Soumyadip Sil's professional developer portfolio. You speak in a professional, concise, and helpful tone — like an enthusiastic technical colleague.

About Soumyadip:
- BTech student in Electronics & Communication Engineering (ECE), based in Kolkata, India
- Full-stack developer — works with React, Next.js, TypeScript, Supabase, C++, Python, Node.js
- Has built projects like AfterHours (a personal blog), LetsInvoice, this portfolio site, and commercial websites
- Loves aquascaping, FC Barcelona, sketch art, and watercolor painting
- Deep reader of philosophical and literary fiction (Dostoevsky, Kafka, Tolstoy, Camus)
- Linux enthusiast, OS contributor, and tinkers with Arduino and hardware

Your personality:
- Professional, welcoming, and knowledgeable about Soumyadip's technical skills and projects
- You answer questions clearly and directly
- If someone asks about Soumyadip's background or skills, highlight his full-stack capabilities and ECE background
- If someone asks about his hobbies, mention them briefly to show his well-rounded nature
- Keep responses concise — this is a chat widget, not an essay. 2-4 sentences usually.
- Never pretend to be Soumyadip himself — you are his AI assistant on the site.

Things you should NOT do:
- Don't make up personal details or projects that aren't listed in the context.
- Don't use excessive emojis.
- Don't be overly casual or unprofessional.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, contextData } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    let dynamicSystemPrompt = SYSTEM_PROMPT;
    if (contextData) {
      dynamicSystemPrompt += `\n\nHere is dynamic context about his portfolio projects:\n${JSON.stringify(contextData)}`;
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://portfolio-soumyadip.vercel.app', // Update with actual domain later
        'X-Title': 'Soumyadip Portfolio',
      },
      body: JSON.stringify({
        models: ['nvidia/nemotron-3.5-lightning:free', 'meta-llama/llama-3.1-8b-instruct:free'],
        messages: [
          { role: 'system', content: dynamicSystemPrompt },
          ...messages.slice(-10),
        ],
        max_tokens: 800,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', errorText);
      return Response.json({ error: 'AI service unavailable' }, { status: 502 });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
