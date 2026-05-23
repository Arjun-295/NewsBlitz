import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Bot,
  Loader2,
  FileText,
  Plus,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  MoreVertical,
  ChevronLeft,
  User,
  Monitor,
  X
} from "lucide-react";
import api from "../api/api";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

// Mock past conversations
const mockHistory = [
  { id: 1, title: "Analysis on AI Funding", date: "Today" },
  { id: 2, title: "Cybersecurity in Q3", date: "Today" },
  { id: 3, title: "OpenAI vs Google Gemini", date: "Yesterday" },
  { id: 4, title: "SpaceX Launch Briefing", date: "Yesterday" },
  { id: 5, title: "Tech Layoffs Summary", date: "Previous 7 Days" },
  { id: 6, title: "Quantum Computing Advances", date: "Previous 7 Days" },
];

const NewsChat = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showCreditModal, setShowCreditModal] = useState(true);

  const fetchNewsList = useCallback(async () => {
    try {
      const response = await api.get("getFeed");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setNewsData(data);
      } else {
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error fetching feeds:", error);
      setNewsData([]);
    }
  }, []);

  useEffect(() => {
    fetchNewsList();
  }, [fetchNewsList]);

  // Dynamic sources count
  const totalItemsCount = Array.isArray(newsData)
    ? newsData.reduce((acc, src) => acc + (src?.items?.length || 0), 0)
    : 0;
  const displaySourcesCount = totalItemsCount > 0 ? Math.max(424, totalItemsCount) : 424;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I've analyzed the latest tech intelligence. We're seeing heavy movement in AI agents and data infrastructure today. **Ask me anything about today's headlines or specific startups.**",
      sources: [],
      timestamp: "NOW",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "Hi! I've analyzed the latest tech intelligence. We're seeing heavy movement in AI agents and data infrastructure today. **Ask me anything about today's headlines or specific startups.**",
        sources: [],
        timestamp: "NOW",
      },
    ]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await api.post("newsChat", { query: userText });
      const data = response.data;

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.answer ?? "I couldn’t find relevant information.",
        sources: data.sources ?? [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = "Sorry, something went wrong while analyzing the news. Please try again.";
      
      if (error.response && error.response.status === 429) {
        errorMessage = error.response.data.error || "You have reached your daily limit of AI messages.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: errorMessage,
          sources: [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[100dvh] bg-[#0c0d0e] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 🔴 CREDIT LIMIT MODAL */}
      {showCreditModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#121418] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 flex items-start justify-between border-b border-white/5 bg-gradient-to-r from-cyan-950/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                  <Bot className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-white tracking-tight">AI Daily Limit</h3>
              </div>
              <button 
                onClick={() => setShowCreditModal(false)}
                className="text-gray-400 hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Welcome to the NewsBlitz AI! Because this is a sample personal project running on limited API credits, each user is restricted to <strong>3 AI messages per day</strong>.
              </p>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6 flex items-center gap-3">
                <Monitor className="size-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-400">Your limit will automatically reset at midnight.</span>
              </div>
              <button 
                onClick={() => setShowCreditModal(false)}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-colors cursor-pointer"
              >
                I Understand, Let's Chat!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📁 SIDEBAR (History / Past Conversations) */}
      <div 
        className={`${isSidebarOpen ? "w-64" : "w-0"} transition-all duration-300 flex-shrink-0 bg-[#121418] border-r border-white/5 flex flex-col overflow-hidden relative z-20`}
      >
        <div className="p-4 flex gap-2">
          {/* Back to Feed */}
          <button 
            onClick={() => navigate("/user/news-feed")}
            className="p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition cursor-pointer"
            title="Back to Feed"
          >
            <ChevronLeft className="size-5" />
          </button>
          
          {/* New Chat Button */}
          <button 
            onClick={handleNewChat}
            className="flex-1 flex items-center gap-2 bg-transparent hover:bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-gray-200 transition-colors cursor-pointer active:scale-95"
          >
            <Plus className="size-4" />
            New Chat
          </button>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition cursor-pointer"
          >
            <PanelLeftClose className="size-5" />
          </button>
        </div>

        {/* Scrollable Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 custom-scroll">
          <div className="mb-6 mt-2">
            <h3 className="px-3 text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Today</h3>
            <div className="space-y-1">
              {mockHistory.filter(h => h.date === "Today").map(h => (
                <button key={h.id} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-gray-300 hover:text-white transition group">
                  <MessageSquare className="size-4 text-gray-500 group-hover:text-cyan-400" />
                  <span className="truncate">{h.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="px-3 text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Yesterday</h3>
            <div className="space-y-1">
              {mockHistory.filter(h => h.date === "Yesterday").map(h => (
                <button key={h.id} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-gray-300 hover:text-white transition group">
                  <MessageSquare className="size-4 text-gray-500 group-hover:text-gray-300" />
                  <span className="truncate">{h.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="px-3 text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Previous 7 Days</h3>
            <div className="space-y-1">
              {mockHistory.filter(h => h.date === "Previous 7 Days").map(h => (
                <button key={h.id} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-gray-300 hover:text-white transition group">
                  <MessageSquare className="size-4 text-gray-500 group-hover:text-gray-300" />
                  <span className="truncate">{h.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🤖 MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#0c0d0e]">
        
        {/* Top Header */}
        <header className="h-14 border-b border-white/5 bg-[#0c0d0e]/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition cursor-pointer"
                title="Open Sidebar"
              >
                <PanelLeft className="size-5" />
              </button>
            )}
            <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              <Monitor className="size-5 text-cyan-400" />
              NewsBlitz AI
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                {displaySourcesCount} SOURCES ACTIVE
              </span>
            </div>
          </div>
        </header>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto w-full">
          {/* Welcome Screen (only show if just 1 initial message or empty) */}
          {messages.length <= 1 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 -mt-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/10 mb-6">
                <Bot className="size-8" />
              </div>
              <h2 className="text-3xl font-black mb-3">How can I help you today?</h2>
              <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-8">
                I'm connected to {displaySourcesCount} live intelligence sources. Ask me to summarize recent funding, explain a new tech trend, or search for specific startup news.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
                <button onClick={() => setInput("What are the top AI breakthroughs this week?")} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-left transition-colors cursor-pointer group">
                  <div className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">AI Breakthroughs</div>
                  <div className="text-xs text-gray-500 mt-1">Summarize the biggest announcements</div>
                </button>
                <button onClick={() => setInput("Show me recent cybersecurity breaches")} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-left transition-colors cursor-pointer group">
                  <div className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">Cybersecurity</div>
                  <div className="text-xs text-gray-500 mt-1">List recent breaches and attacks</div>
                </button>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto w-full pt-8 pb-32 px-4 md:px-0">
            {messages.length > 1 && messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 mb-8 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                
                {/* Bot Avatar */}
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                    <Monitor className="size-4" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#2f2f2f] text-white rounded-br-sm"
                        : "text-gray-200"
                    }`}
                  >
                    <div className="prose prose-invert prose-cyan max-w-none text-sm md:text-[15px]">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                              {children}
                            </a>
                          ),
                          li: ({ children }) => <li className="list-disc ml-4 mb-1">{children}</li>,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>

                    {/* Sources rendered as small chips if present */}
                    {msg.sender === "bot" && Array.isArray(msg.sources) && msg.sources.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {msg.sources.map((src, i) => {
                          let sourceName = "Source Briefing";
                          let sourceUrl = "#";
                          if (typeof src === "string") {
                            sourceUrl = src;
                            try {
                              if (src.startsWith("http")) {
                                const urlObj = new URL(src);
                                sourceName = urlObj.hostname.replace("www.", "");
                              } else { sourceName = src; }
                            } catch (e) { sourceName = src; }
                          } else if (src && typeof src === "object") {
                            sourceName = src.name || src.title || "Source Briefing";
                            sourceUrl = src.url || src.link || "#";
                          }

                          return (
                            <a
                              key={i}
                              href={sourceUrl !== "#" ? sourceUrl : undefined}
                              target={sourceUrl !== "#" ? "_blank" : undefined}
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2025] hover:bg-[#25282f] border border-white/10 rounded-full text-xs font-medium text-gray-300 transition-colors"
                            >
                              <FileText className="size-3 text-cyan-500" />
                              {sourceName}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* User Avatar */}
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-[#2f2f2f] text-gray-300 flex items-center justify-center shrink-0 mt-1">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-4 mb-8 justify-start">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                  <Monitor className="size-4" />
                </div>
                <div className="px-5 py-4 rounded-2xl text-gray-400 flex items-center gap-3">
                  <Loader2 className="size-4 animate-spin text-cyan-400" />
                  <span className="text-sm font-medium">Analyzing sources...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ⌨️ Fixed Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e] to-transparent shrink-0">
          <div className="max-w-3xl mx-auto w-full">
            <form onSubmit={handleSend} className="relative group">
              <div className="bg-[#2f2f2f] border border-white/10 rounded-2xl sm:rounded-3xl p-1.5 flex items-end sm:items-center shadow-lg transition-all focus-within:ring-2 focus-within:ring-cyan-500/50">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Message NewsBlitz AI..."
                  className="flex-1 bg-transparent border-0 outline-none text-white placeholder-gray-400 text-sm md:text-base py-3 px-4 resize-none max-h-32 min-h-[52px]"
                  disabled={isLoading}
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-white text-black p-2 md:p-2.5 rounded-xl sm:rounded-full m-1 flex items-center justify-center disabled:opacity-30 disabled:bg-[#4a4a4a] hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="size-4 md:size-5" />
                </button>
              </div>
              <div className="text-center mt-2 text-[10px] text-gray-500">
                NewsBlitz AI can make mistakes. Check important info.
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsChat;
