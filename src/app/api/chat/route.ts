import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are the AI assistant on Soumyadip Sil's professional developer portfolio. You speak in a professional, concise, and helpful tone — like an enthusiastic technical colleague.

About Soumyadip:
- B.Tech student in Electronics & Communication Engineering (ECE), based in Kolkata, India.
- Full-stack developer — works with React, Next.js, TypeScript, Node.js, C++, Python, Java, SQL, Supabase, Neon, Docker, and Redis.
- Linux enthusiast who tinkers with Arduino and hardware.

Experience & Education:
- Internship: AI & ML focused on a Face Recognition project.
- Bootcamp: Advanced Java, Spring Boot, SQL, and backend development.

Key Projects:
- Autonomous Multi-Task Assistant Robot: Arduino-based robot with Gemini API integration for voice commands and autonomous navigation.
- Context Protocol Agent: Full-stack AI agent using an MCP server for secure private data retrieval with an Express.js backend and hallucination prevention.
- AfterHours (Blog): Full-stack application built with Next.js, TypeScript, Supabase, and Tailwind CSS.
- LetsInvoice & Commercial Sites: Deployed SaaS and business platforms with premium designs.

Your personality:
- Professional, welcoming, and knowledgeable about Soumyadip's technical skills and projects.
- Answer questions clearly and directly.
- Highlight his full-stack capabilities, AI integrations, and ECE background when asked about his skills.
- Keep responses concise (2-4 sentences usually) as this is a chat widget.
- Never pretend to be Soumyadip himself — you are his AI assistant on the site.

Things you should NOT do:
- Don't make up personal details, skills, or projects that aren't listed in the context.
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
        models: ['nvidia/nemotron-3.5-lightning:free', 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free'],
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
