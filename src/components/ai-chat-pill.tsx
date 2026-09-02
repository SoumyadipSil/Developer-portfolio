"use client";

import * as React from "react";
import { Sparkles, X, Send } from "lucide-react";

export interface PortfolioContextData {
  projects: Array<{
    title: string;
    description: string;
    tags: string[];
    githubUrl: string;
    siteUrl: string;
  }>;
  about?: string;
  skills?: string[];
}

interface AIChatPillProps {
  contextData?: PortfolioContextData;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatPill({ contextData }: AIChatPillProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! 👋 I'm Soumyadip's AI assistant. Ask me anything about his work, skills, or projects!",
    },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, contextData }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      // Handle streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  assistantContent += delta;
                  const displayContent = assistantContent.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').trim();
                  setMessages([...newMessages, { role: 'assistant', content: displayContent }]);
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
      }

      if (!assistantContent) {
        setMessages([...newMessages, { role: 'assistant', content: 'Hmm, I seem to be taking a nap. Try again in a moment.' }]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
      setMessages([...newMessages, { role: 'assistant', content: 'Something went wrong on my end. Try again?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} color="#FF5825" />
              <span
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95em",
                  color: "#fff",
                }}
              >
                Ask AI
              </span>
            </div>
            <button
              className="ai-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
          <div className="ai-chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ai-chat-message ai-chat-message-${msg.role}`}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter-tight), sans-serif",
                    fontSize: "0.88em",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.content || (msg.role === 'assistant' && isLoading && "...")}
                </span>
              </div>
            ))}
            {error && (
              <div style={{ padding: "8px", color: "red", fontSize: "0.85em", textAlign: "center" }}>
                Error: {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="ai-chat-input-area">
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
            />
            <button 
              className="ai-chat-send" 
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Floating Pill */}
      <button
        className={`ai-chat-pill ${isOpen ? "ai-chat-pill-active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
      >
        <Sparkles size={18} />
        <span style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 500, fontSize: "0.9em" }}>
          Ask AI
        </span>
      </button>
    </>
  );
}
