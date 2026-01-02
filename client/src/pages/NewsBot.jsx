import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, Loader2, FileText } from "lucide-react";
import api from "../api/api";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";

const NewsChat = () => {
  // 🔹 Fetch news list ONLY for UI (count, display)
  const [newsData, setNewsData] = useState([]);

  const fetchNewsList = useCallback(async () => {
    try {
      const response = await api.get("getFeed");
      const data = response.data?.data ?? [];
      setNewsData(data);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  }, []);

  useEffect(() => {
    fetchNewsList();
  }, [fetchNewsList]);

  // 🔹 Chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I've read the latest tech news. Ask me anything about today's headlines!",
      sources: [],
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔹 Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/newsChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userText }), // ✅ ONLY query
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.answer ?? "I couldn’t find relevant information.",
        sources: data.sources ?? [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Sorry, something went wrong while analyzing the news. Please try again.",
          sources: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123] text-white">
      <div className="pt-7">
        <Navbar />
      </div>

      <div className="flex flex-col h-[65vh] max-w-7xl mx-auto my-4 bg-gray-900 rounded-lg border border-gray-700 shadow-xl">
        {/* Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg">NewsBlitz Assistant</h2>
            <p className="text-xs text-gray-400">
              Online • Indexed {newsData.length} feeds
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-indigo-600 rounded-br-none"
                    : "bg-gray-800 border border-gray-700 rounded-bl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </p>

                {Array.isArray(msg.sources) && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-600/50">
                    <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                      <FileText size={12} /> Sources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(msg.sources || []).map((src, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-gray-900 px-2 py-1 rounded border border-gray-600"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-indigo-400" />
                <span className="text-sm text-gray-400">Reading articles…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-gray-800 border-t border-gray-700"
        >
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about startups, AI, funding, layoffs…"
              className="w-full bg-gray-900 text-white rounded-xl pl-4 pr-12 py-3 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 rounded-lg disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsChat;
