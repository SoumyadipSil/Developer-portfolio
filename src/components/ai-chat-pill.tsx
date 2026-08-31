"use client";

import * as React from "react";
import { Sparkles, X, Send } from "lucide-react";

// Optional: you can extend this interface later as you add more data
export interface PortfolioContextData {
  projects: Array<{
    title: string;
    description: string;
    tags: string[];
    githubUrl: string;
    siteUrl: string;
  }>;
  // You can add more fields here later (e.g. skills, about text, etc.)
  about?: string;
  skills?: string[];
}

interface AIChatPillProps {
  contextData?: PortfolioContextData;
}

export function AIChatPill({ contextData }: AIChatPillProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{role: string; content: string}[]>([
    { role: "assistant", content: "Hey! 👋 I'm Soumyadip's AI assistant. Ask me anything about his work, skills, or projects!" },
  ]);
  const [input, setInput] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    
    // TODO: Connect to backend (OpenRouter, Vercel AI SDK, etc.)
    // You can pass `contextData` in the system prompt to the API here!
    // Example:
    // const systemPrompt = `You are Soumyadip's AI. Here is his portfolio info: ${JSON.stringify(contextData)}`;

    // Placeholder response - backend will be connected later
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm not connected to a backend yet, but Soumyadip will hook me up soon! 🚀 In the meantime, feel free to explore the portfolio above.",
        },
      ]);
    }, 800);
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
                  {msg.content}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="ai-chat-input-area">
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
            />
            <button className="ai-chat-send" onClick={handleSend} aria-label="Send message">
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
