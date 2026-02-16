"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

type Channel = "idea" | "feedback";

interface SuggestionItem {
  id: string;
  channel: Channel;
  message: string;
  status: string;
  created_at: string;
}

interface SuggestionsWindowProps {
  suggestionsRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  setShowSuggestions: (v: boolean) => void;
}

export default function SuggestionsWindow({
  suggestionsRef,
  onPointerDown,
  setShowSuggestions,
}: SuggestionsWindowProps) {
  const [closing, setClosing] = useState(false);
  const [channel, setChannel] = useState<Channel>("idea");
  const [messages, setMessages] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deleteTokens, setDeleteTokens] = useState<Record<string, string>>({});
  const [adminToken, setAdminToken] = useState("");
  const isAdmin = useMemo(() => adminToken.length > 0, [adminToken]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    bottomRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowSuggestions(false);
      setClosing(false);
    }, 300);
  };

  // Load messages
  const loadMessages = async (ch: Channel) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://shnplatz.vercel.app/api/suggestions?channel=${ch}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load");
      setMessages(data.items || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages(channel);
  }, [channel]);

  useEffect(() => {
    scrollToBottom("auto");
  }, [messages, channel]);

  const handleSend = async () => {
    setError(null);
    const msg = inputText.trim();
    if (!msg) {
      setError("Message cannot be empty.");
      return;
    }
    try {
      const res = await fetch("https://shnplatz.vercel.app/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, message: msg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      const item = data.item;
      const token = data.deleteToken;
      setMessages((prev) => [...prev, item]);
      requestAnimationFrame(() => scrollToBottom("smooth"));
      setDeleteTokens((prev) => ({ ...prev, [item.id]: token }));
      setInputText("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send");
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    const headers: Record<string, string> = {};
    if (isAdmin) {
      headers["x-admin-token"] = adminToken;
    } else {
      const token = deleteTokens[id];
      if (!token) return;
      headers["x-delete-token"] = token;
    }
    try {
      const res = await fetch(`https://shnplatz.vercel.app/api/suggestions/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setDeleteTokens((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div
      ref={suggestionsRef}
      onPointerDownCapture={() => {}}
      className="fixed flex items-center justify-center touch-manipulation w-[96vw] sm:w-[94vw] max-w-6xl h-[88vh] sm:h-[82vh] max-h-[900px] min-h-[560px] sm:min-h-[650px] left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${closing ? "dockDown" : "dockUp"}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="border-[4px] sm:border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10 overflow-hidden bg-[#12162A]">
          {/* Title Bar */}
          <div
            onPointerDown={(e) => { onPointerDown(e); }}
            className="touch-none shrink-0 flex items-center justify-center bg-[#1B2140] border-b-[3px] sm:border-b-[4px] border-[#36312C] px-3 sm:px-4 py-1.5 sm:py-2 cursor-move text-center relative"
          >
            <span className="font-bold text-[#F9F2E4] w-full pulse-glow text-sm sm:text-base">Suggestions</span>
            <div className="absolute right-3 sm:right-4 flex gap-2">
              <button
                onClick={handleClose}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3px] sm:border-[3.5px] border-[#36312C] text-[#36312C] font-extrabold hover:bg-[#757ed3] transition-colors text-sm sm:text-base"
                aria-label="Minimize"
              >−</button>
              <button
                onClick={handleClose}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3px] sm:border-[3.5px] border-[#36312C] text-[#36312C] font-extrabold hover:bg-[#c4576e] transition-colors text-sm sm:text-base"
                aria-label="Close"
              >✕</button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 min-h-0 flex-col sm:flex-row">
            {/* Sidebar */}
            <div className="w-full sm:w-[210px] shrink-0 bg-[#161B33] border-b-[4px] sm:border-b-0 sm:border-r-[4px] border-[#36312C] p-2 sm:p-3 text-[#F9F2E4]">
              <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-70 mb-2">Channels</div>
              <div className="grid grid-cols-2 gap-2 sm:block">
                <button
                  onClick={() => setChannel("idea")}
                  className={`w-full text-left px-3 py-1.5 sm:py-2 rounded-lg border-[3px] border-[#36312C] transition-colors text-xs sm:text-sm ${channel === "idea" ? "bg-[#22306B]" : "bg-[#1B2140] hover:bg-[#22306B]"}`}
                >
                  <span className="opacity-80">#</span> ideas
                </button>
                <button
                  onClick={() => setChannel("feedback")}
                  className={`w-full text-left px-3 py-1.5 sm:py-2 rounded-lg border-[3px] border-[#36312C] transition-colors text-xs sm:text-sm ${channel === "feedback" ? "bg-[#22306B]" : "bg-[#1B2140] hover:bg-[#22306B]"}`}
                >
                  <span className="opacity-80">#</span> feedback
                </button>
              </div>

              <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg border-[3px] border-[#36312C] bg-[#562929] text-[10px] sm:text-xs leading-relaxed">
                <div className="font-bold mb-1 text-[#F9F2E4]">Note</div>
                <div className="opacity-90">
                  You can delete your message <span className="font-bold">only before you refresh the page</span>.
                </div>
              </div>

              <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg border-[3px] border-[#36312C] bg-[#1B2140] text-[10px] sm:text-xs">
                <div className="font-bold mb-2">Owner tools</div>
                <input
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  placeholder="Admin token (not saved)"
                  className="w-full px-2 py-2 rounded-md bg-[#12162A] border-[2px] border-[#36312C] outline-none text-xs sm:text-sm"
                />
                <div className="opacity-70 mt-2">For updating messages status ^^</div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#12162A]">
              <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-3">
                {loading ? (
                  <div className="text-[#F9F2E4] opacity-70 text-xs sm:text-sm">Loading…</div>
                ) : messages.length === 0 ? (
                  <div className="text-[#F9F2E4] opacity-70 text-xs sm:text-sm">No messages yet :O</div>
                ) : (
                  messages.map((msg, idx) => {
                    const canDelete = isAdmin || !!deleteTokens[msg.id];
                    return (
                      <div key={msg.id} className="flex gap-2 sm:gap-3 items-start">
                        <div
                          className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border-[2px] sm:border-[3px] border-[#36312C] shrink-0"
                          style={{ backgroundColor: msg.status === "new" ? "#7E4040" : "#22306B" }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#F9F2E4] font-bold text-sm sm:text-base">
                              {msg.channel === "idea" ? `Idea #${idx + 1}` : `Feedback #${idx + 1}`}
                            </span>
                            <span className="text-[#F9F2E4] opacity-50 text-[10px] sm:text-xs">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                            <span
                              className="ml-auto text-[10px] sm:text-xs px-2 py-[1px] sm:py-[2px] rounded-full border-[2px] border-[#36312C] text-[#F9F2E4]"
                              style={{ backgroundColor: msg.status === "new" ? "#7E4040" : "#1B2140" }}
                            >
                              {msg.status}
                            </span>
                          </div>
                          <div
                            className="mt-1 p-2 sm:p-3 rounded-lg sm:rounded-xl border-[2px] sm:border-[3px] text-[#F9F2E4] break-words text-xs sm:text-sm max-h-60 overflow-y-auto whitespace-pre-wrap"
                            style={{
                              borderColor: msg.status === "new" ? "#7E4040" : "#36312C",
                              backgroundColor: msg.status === "new" ? "#231A2D" : "#1B2140",
                            }}
                          >
                            {msg.message}
                          </div>
                          {canDelete && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                              <button
                                onClick={() => handleDelete(msg.id)}
                                className="text-[10px] sm:text-xs px-2 py-1 rounded-md border-[2px] border-[#36312C] bg-[#7E4040] text-[#F9F2E4] hover:bg-[#9E5050] transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input Bar */}
              <div className="shrink-0 border-t-[3px] sm:border-t-[4px] border-[#36312C] p-2 sm:p-3 bg-[#161B33]">
                {error && (
                  <div className="text-red-400 text-[10px] sm:text-xs mb-2">{error}</div>
                )}
                <div className="flex gap-2">
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={`Send a ${channel === "idea" ? "idea" : "feedback"}...`}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#12162A] border-[2px] sm:border-[3px] border-[#36312C] text-[#F9F2E4] outline-none text-xs sm:text-sm resize-none"
                  />
                  <button
                    onClick={handleSend}
                    className="px-3 sm:px-4 py-2 rounded-lg border-[2px] sm:border-[3px] border-[#36312C] bg-[#22306B] text-[#F9F2E4] font-bold text-xs sm:text-sm hover:bg-[#2B3D8B] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
