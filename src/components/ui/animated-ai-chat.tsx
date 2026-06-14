"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { SendIcon, LoaderIcon, Sparkles, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  "Explain the Sharpe ratio vs Sortino ratio",
  "How does Black-Scholes pricing work?",
  "What is VaR and how is it calculated?",
  "Explain momentum trading strategies",
];

function normalizeMath(text: string): string {
  return text
    .replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_: string, m: string) => `\n$$\n${m.trim()}\n$$\n`)
    .replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_: string, m: string) => `$${m.trim()}$`);
}

const MD: Record<string, React.ComponentType<{ children?: React.ReactNode; inline?: boolean }>> = {
  h1: ({ children }) => <h1 className="font-display text-xl font-bold text-white mt-4 mb-2 border-b border-white/10 pb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="font-display text-base font-bold text-white mt-3 mb-1.5">{children}</h2>,
  h3: ({ children }) => <h3 className="font-display text-sm font-semibold text-violet-300 mt-2 mb-1">{children}</h3>,
  p: ({ children }) => <p className="text-white/80 text-sm leading-relaxed mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="text-violet-300 italic">{children}</em>,
  ul: ({ children }) => <ul className="mb-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 space-y-1 list-decimal pl-4 text-white/80 text-sm">{children}</ol>,
  li: ({ children }) => (
    <li className="text-white/80 text-sm flex gap-2 items-start">
      <span className="text-violet-400 mt-[3px] text-xs flex-shrink-0">▸</span>
      <span>{children}</span>
    </li>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="font-mono text-xs bg-white/10 text-violet-300 px-1.5 py-0.5 rounded">{children}</code>
    ) : (
      <code className="block font-mono text-xs text-white/70 bg-black/40 border border-white/10 rounded-lg p-3 mb-2 overflow-x-auto whitespace-pre leading-relaxed">{children}</code>
    ),
  pre: ({ children }) => <div className="mb-2">{children}</div>,
  blockquote: ({ children }) => <blockquote className="border-l-2 border-violet-500/50 pl-3 my-2 text-white/50 text-sm italic">{children}</blockquote>,
  hr: () => <hr className="border-white/10 my-3" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-3 rounded-lg border border-white/10">
      <table className="w-full text-sm min-w-max">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/5 border-b border-white/10">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="text-left px-3 py-2 text-violet-300 text-[10px] uppercase tracking-widest font-semibold">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-white/70 text-xs">{children}</td>,
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 ml-1">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-white/70 rounded-full"
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}
    >
      <div className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
        isUser ? "bg-fuchsia-500/20 border border-fuchsia-500/30" : "bg-violet-500/20 border border-violet-500/30"
      )}>
        {isUser ? <User size={13} className="text-fuchsia-400" /> : <Bot size={13} className="text-violet-400" />}
      </div>
      <div className={cn(
        "max-w-[78%] px-4 py-3 rounded-2xl text-sm",
        isUser
          ? "rounded-tr-sm bg-fuchsia-500/10 border border-fuchsia-500/20 text-white/90"
          : "rounded-tl-sm bg-white/[0.04] border border-white/[0.08]"
      )}>
        {isUser
          ? <p className="leading-relaxed">{message.content}</p>
          : <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={MD as never}>{normalizeMath(message.content)}</ReactMarkdown>
        }
      </div>
    </motion.div>
  );
}

const STORAGE_KEY = "axiom-animated-chat";

export function AnimatedAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inputFocused, setInputFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "60px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  async function send(text?: string) {
    const content = (text ?? value).trim();
    if (!content || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "60px";
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
      setMessages((p) => [...p, { role: "assistant", content: "**Error:** Could not reach AXIOM Intelligence. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  const inputBox = (
    <motion.div
      className={cn(
        "relative rounded-2xl border shadow-2xl backdrop-blur-2xl transition-all duration-300",
        inputFocused
          ? "border-violet-500/50 bg-white/[0.04] shadow-violet-500/10"
          : "border-white/[0.10] bg-white/[0.03]"
      )}
      style={{
        boxShadow: inputFocused
          ? "0 0 0 1px rgba(139,92,246,0.25), 0 8px 40px rgba(139,92,246,0.15), 0 2px 12px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.3)",
      }}
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.15 }}
    >
      <div className="px-5 pt-5 pb-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => { setValue(e.target.value); adjustHeight(); }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder="Ask Axiom Intelligence a question…"
          disabled={loading}
          className="w-full resize-none bg-transparent border-none text-white/90 text-base focus:outline-none placeholder:text-white/25 min-h-[68px] max-h-44 leading-relaxed"
          style={{ overflow: "hidden" }}
        />
      </div>
      <div className="px-5 pb-4 flex items-center justify-between gap-4">
        <p className="text-white/20 text-[10px] font-mono tracking-wide">Enter to send · Shift+Enter for new line</p>
        <motion.button
          onClick={() => send()}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={loading || !value.trim()}
          className={cn(
            "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
            value.trim() && !loading
              ? "text-black shadow-lg"
              : "bg-white/[0.06] text-white/25 cursor-not-allowed"
          )}
          style={value.trim() && !loading ? {
            background: "linear-gradient(135deg, #a78bfa, #818cf8)",
            boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
          } : {}}
        >
          {loading
            ? <LoaderIcon className="w-4 h-4 animate-spin" />
            : <SendIcon className="w-4 h-4" />
          }
          <span>Send</span>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col w-full h-full text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[96px] animate-pulse delay-1000" />
      </div>

      {messages.length === 0 ? (
        /* ── Empty state: everything centered ── */
        <motion.div
          key="empty"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center px-6 pb-8 relative z-10"
        >
          <div className="w-full max-w-xl flex flex-col items-center gap-8">
            {/* Icon + heading */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20"
                style={{ boxShadow: "0 0 32px rgba(139,92,246,0.15)" }}>
                <Sparkles size={24} className="text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white mb-1.5">Ask AXIOM Intelligence</p>
                <p className="text-white/40 text-sm leading-relaxed">Expert answers on finance, risk models, and data science.</p>
              </div>
            </div>

            {/* Prominent centered input */}
            <div className="w-full">{inputBox}</div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  onClick={() => send(q)}
                  className="text-xs text-white/45 border border-white/10 hover:border-violet-500/50 hover:text-white/80 hover:bg-violet-500/5 px-3.5 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* ── Conversation: scrollable messages ── */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 relative z-10 max-w-3xl w-full mx-auto" style={{ scrollbarWidth: "none" }}>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
              {loading && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={13} className="text-violet-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.08] flex items-center gap-1">
                    <span className="text-white/40 text-sm">Thinking</span>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* ── Bottom input ── */}
          <div className="relative z-10 px-6 pb-6 max-w-3xl w-full mx-auto">
            {inputBox}
          </div>
        </>
      )}

      {/* Cursor glow when input focused */}
      {inputFocused && (
        <motion.div
          className="fixed w-[40rem] h-[40rem] rounded-full pointer-events-none z-0 opacity-[0.03] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 blur-[96px]"
          animate={{ x: mousePosition.x - 320, y: mousePosition.y - 320 }}
          transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.5 }}
        />
      )}
    </div>
  );
}
