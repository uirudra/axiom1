"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Explain the P/E ratio and how to interpret it",
  "What is alpha in finance and how is it measured?",
  "How does momentum trading work?",
  "Explain Monte Carlo simulation for VaR",
  "What is the Black-Scholes model?",
  "How do GARCH models capture volatility?",
  "Compare Sharpe ratio vs Sortino ratio in a table",
  "What is cointegration and why does it matter?",
];

/**
 * The AI returns LaTeX in \[...\] and \(...\) notation.
 * remark-math expects $$...$$ and $...$, so we normalise first.
 */
function normalizeMath(text: string): string {
  return text
    .replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_: string, m: string) => `\n$$\n${m.trim()}\n$$\n`)
    .replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_: string, m: string) => `$${m.trim()}$`);
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-plasma/20 border border-plasma/30 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot size={13} className="text-plasma" />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-hull border border-rim/40">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-dim"
            style={{ animation: `type-dot 1.4s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Markdown component overrides ───────────────────────────────── */
const MD: Record<string, React.ComponentType<{ children?: React.ReactNode; inline?: boolean }>> = {
  h1: ({ children }) => (
    <h1 className="font-display text-2xl font-bold text-fore mt-5 mb-3 leading-tight border-b border-rim/30 pb-2">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-lg font-bold text-fore mt-4 mb-2 leading-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-base font-semibold text-plasma mt-3 mb-1.5">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-fore/90 text-sm leading-relaxed mb-3 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-fore">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="not-italic text-plasma/80" style={{ fontStyle: "italic" }}>{children}</em>
  ),
  ul: ({ children }) => <ul className="mb-3 space-y-1.5">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 space-y-1.5 list-decimal pl-5 text-fore/90 text-sm">{children}</ol>,
  li: ({ children }) => (
    <li className="text-fore/90 text-sm leading-relaxed flex gap-2 items-start">
      <span className="text-plasma mt-[3px] flex-shrink-0 text-xs">▸</span>
      <span className="flex-1 min-w-0">{children}</span>
    </li>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="font-mono text-xs bg-rim/60 text-plasma px-1.5 py-0.5 rounded">{children}</code>
    ) : (
      <code className="block font-mono text-xs text-fore/80 bg-void/80 border border-rim/50 rounded-xl p-4 mb-3 overflow-x-auto whitespace-pre leading-relaxed">{children}</code>
    ),
  pre: ({ children }) => <div className="mb-3">{children}</div>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-plasma/50 pl-4 my-3 text-dim text-sm italic">{children}</blockquote>
  ),
  hr: () => <hr className="border-rim/40 my-4" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4 rounded-xl border border-rim/50">
      <table className="w-full text-sm font-mono min-w-max">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-rim/30 border-b border-rim/50">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-rim/20 last:border-0 hover:bg-hull/60 transition-colors">{children}</tr>,
  th: ({ children }) => (
    <th className="text-left px-4 py-2.5 text-plasma text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap">{children}</th>
  ),
  td: ({ children }) => <td className="px-4 py-2.5 text-fore/80 text-xs whitespace-nowrap">{children}</td>,
};

function AssistantMessage({ content }: { content: string }) {
  const normalized = normalizeMath(content);
  return (
    <div className="math-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={MD as never}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
          ${isUser ? "bg-pulse/20 border border-pulse/30" : "bg-plasma/20 border border-plasma/30"}`}
      >
        {isUser ? <User size={13} className="text-pulse" /> : <Bot size={13} className="text-plasma" />}
      </div>

      <div
        className={`max-w-[78%] px-4 py-3.5 rounded-2xl font-body
          ${isUser
            ? "rounded-tr-sm bg-pulse/10 border border-pulse/20 text-fore"
            : "rounded-tl-sm bg-hull border border-rim/50"}`}
      >
        {isUser
          ? <p className="text-sm leading-relaxed">{message.content}</p>
          : <AssistantMessage content={message.content} />
        }
      </div>
    </motion.div>
  );
}

const STORAGE_KEY = "axiom-chat-history";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load saved messages on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);

  // Save messages to localStorage on every change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
  }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages((p) => [...p, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "**Error:** Could not reach AXIOM Intelligence. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-rim/40 bg-hull/20 p-6 gap-6 flex-shrink-0">
        <div>
          <p className="text-dim font-mono text-[10px] uppercase tracking-widest mb-3">Suggested Questions</p>
          <div className="space-y-1.5">
            {SUGGESTIONS.map((q, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => send(q)}
                disabled={loading}
                className="group w-full text-left text-xs text-dim hover:text-fore border border-rim/30 hover:border-plasma/30 bg-transparent hover:bg-plasma/5 rounded-xl px-3 py-2.5 transition-all duration-200 flex items-start gap-2 disabled:opacity-40"
              >
                <ChevronRight size={10} className="text-plasma/40 group-hover:text-plasma mt-0.5 flex-shrink-0 transition-colors" />
                <span className="leading-snug">{q}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="mt-auto border-t border-rim/30 pt-5 flex flex-col gap-3">
          <button
            onClick={clearHistory}
            disabled={messages.length === 0}
            className="w-full text-[10px] font-mono text-pulse/50 hover:text-pulse border border-rim/20 hover:border-pulse/30 rounded-lg py-2 transition-all disabled:opacity-20"
          >
            Clear History
          </button>
          <p className="text-[10px] font-mono text-dim/30 leading-relaxed">
            Powered by Groq · gpt-oss-120B<br />Finance &amp; Data Science Expert
          </p>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full min-h-64 text-center gap-5 py-16"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,rgba(0,245,212,0.1),rgba(247,37,133,0.1))", border: "1px solid rgba(0,245,212,0.2)" }}
                >
                  <Sparkles size={26} className="text-plasma" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-fore mb-2">Ask AXIOM Intelligence</p>
                  <p className="text-dim text-sm max-w-sm leading-relaxed">
                    Expert answers with rendered formulas, tables, and structured analysis on quantitative finance and data science.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                  {SUGGESTIONS.slice(0, 3).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => send(q)}
                      className="text-xs font-mono text-dim border border-rim/40 hover:border-plasma/40 hover:text-plasma px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                      {q.split(" ").slice(0, 4).join(" ")}…
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
            )}
            {loading && (
              <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-rim/40 p-4 bg-hull/20 backdrop-blur-sm">
          <div className="flex items-end gap-3 rounded-2xl border border-rim/60 bg-void/60 px-4 py-3 focus-within:border-plasma/40 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask about finance, data science, risk models…"
              disabled={loading}
              rows={1}
              className="flex-1 resize-none bg-transparent text-fore text-sm placeholder-dim/40 outline-none font-body leading-relaxed max-h-32"
              style={{ scrollbarWidth: "none" }}
            />
            <motion.button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-25 transition-all duration-200"
              style={{
                background: input.trim() ? "linear-gradient(135deg,#00f5d4,#7209b7)" : "#1a1a2e",
                boxShadow: input.trim() ? "0 4px 14px rgba(0,245,212,0.3)" : "none",
              }}
            >
              <Send size={13} className="text-void" />
            </motion.button>
          </div>
          <p className="text-dim/25 text-[10px] font-mono text-center mt-2">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
