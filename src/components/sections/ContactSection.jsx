import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import {
  Terminal,
  Send,
  MessageSquare,
  Loader2,
  LogOut,
  LogIn,
  ShieldAlert,
  Cpu,
  Reply,
  X,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";

function ChatSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 select-none pointer-events-none">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={`flex ${n % 2 === 0 ? "justify-end" : "justify-start"}`}
        >
          <motion.div
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: n * 0.2,
            }}
            className={`flex gap-2 sm:gap-3 w-[85%] sm:max-w-[75%] items-start ${n % 2 === 0 ? "flex-row-reverse" : ""}`}
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-zinc-300 dark:bg-zinc-800 border-[2px] border-zinc-950 dark:border-zinc-700 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 w-full min-w-0">
              <div
                className={`flex items-center gap-1.5 ${n % 2 === 0 ? "flex-row-reverse" : ""}`}
              >
                <div className="h-3 w-16 bg-zinc-300 dark:bg-zinc-800 rounded-none" />
                <div className="h-3.5 w-10 bg-indigo-500/10 dark:bg-indigo-400/10 border border-zinc-300 dark:border-zinc-700" />
              </div>
              <div className="p-2 sm:p-3 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-none space-y-1.5">
                <div className="h-3 bg-zinc-300 dark:bg-zinc-800 rounded-none w-full" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-none w-[70%]" />
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default function ContactSection() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [developerEmails, setDeveloperEmails] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const timeStr = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateStr = date.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    return `${dateStr} @ ${timeStr}`;
  };

  useEffect(() => {
    if (messages.length > 0 && !loading) {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          scrollToBottom();
        }
      }
    }
  }, [messages, loading]);

  useEffect(() => {
    let channel = null;
    let ignore = false;
    const initialize = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (ignore) return;
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .maybeSingle();
          if (ignore) return;
          setProfile(data);
        }

        const { data: devs } = await supabase
          .from("profiles")
          .select("email")
          .eq("role", "developer");
        if (ignore) return;
        if (devs) setDeveloperEmails(devs.map((d) => d.email));

        const { data: msgs } = await supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: true });
        if (ignore) return;
        if (msgs) setMessages(msgs);

        const chatChannel = supabase
          .channel("public-chat")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            (payload) => {
              setMessages((prev) => {
                if (prev.some((msg) => msg.id === payload.new.id)) return prev;
                return [...prev, payload.new];
              });
            },
          );

        chatChannel.subscribe((status) => {
          if (status === "SUBSCRIBED" && !ignore) {
            channel = chatChannel;
          }
        });
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    initialize();

    return () => {
      ignore = true;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [developerEmails]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const sendMessage = async () => {
    if (!text.trim() || !user || sending) return;
    setSending(true);
    const displayName =
      profile?.display_name || user.user_metadata?.full_name || "Anonymous";

    const payload = {
      content: text.trim(),
      user_name: displayName,
      user_avatar: profile?.user_avatar || user.user_metadata?.avatar_url,
      user_email: user.email,
      reply_to: replyingTo
        ? {
            id: replyingTo.id,
            user_name: replyingTo.user_name,
            content: replyingTo.content,
          }
        : null,
    };

    await supabase.from("messages").insert([payload]);

    setText("");
    setReplyingTo(null);
    setSending(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent pt-20 md:pt-24 px-4 sm:px-6 py-12 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[280px] bg-indigo-500/5 dark:bg-indigo-500/[0.02] blur-[70px] sm:blur-[130px] rounded-full pointer-events-none select-none" />

      <div className="w-full max-w-4xl z-10 relative space-y-6 sm:space-y-8">
        <div className="flex flex-col items-center text-center space-y-2 select-none">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(99,102,241,0.15)]">
            <MessageSquare className="w-3.5 h-3.5" /> 05 . Contact
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase text-zinc-950 dark:text-zinc-50 drop-shadow-[2px_2px_0px_rgba(99,102,241,0.3)]">
            Broadcast_Room.log
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 select-none w-full">
          {[
            {
              name: "GITHUB",
              icon: "ri-github-fill",
              link: "https://github.com/Ramaaeln",
            },
            {
              name: "LINKEDIN",
              icon: "ri-linkedin-box-fill",
              link: "https://www.linkedin.com/in/ramaelansary/",
            },
            {
              name: "INSTAGRAM",
              icon: "ri-instagram-line",
              link: "https://instagram.com/ramdneln",
            },
            {
              name: "EMAIL",
              icon: "ri-mail-line",
              link: "mailto:abdullahramadanelansary@gmail.com",
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.02)] text-zinc-950 dark:text-zinc-50 font-mono text-[10px] font-black uppercase hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              <i className={`${social.icon} text-sm`}></i> {social.name}
            </a>
          ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.04)] flex flex-col relative transition-all">
          <div className="bg-zinc-950 px-4 py-3.5 flex items-center justify-between border-b-4 border-zinc-950 select-none font-mono">
            <div className="flex items-center gap-2 w-full mr-2 overflow-hidden text-white">
              <div className="flex gap-1.5 mr-1 shrink-0">
                <span className="w-2.5 h-2.5 rounded-none bg-rose-500 border border-zinc-950 animate-pulse"></span>
                <span className="w-2.5 h-2.5 rounded-none bg-amber-500 border border-zinc-950"></span>
                <span className="w-2.5 h-2.5 rounded-none bg-emerald-500 border border-zinc-950"></span>
              </div>
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-black uppercase tracking-widest truncate">
                CHAT_STREAM.EXE // MULTIUSER_LOG
              </span>
            </div>
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-rose-400 font-mono text-[10px] font-black uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />{" "}
                <span className="hidden sm:inline">DISCONNECT</span>
              </button>
            )}
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950/40 border-b-2 border-zinc-950 dark:border-zinc-800 px-4 py-2 flex items-center justify-between text-[9px] font-mono font-bold text-zinc-500 dark:text-zinc-400 select-none gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-indigo-500" /> STATUS: LIVE
              </span>
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-emerald-500" /> STREAM:
                ENCRYPTED
              </span>
            </div>
            <div className="truncate uppercase">
              BUFFER_SYNCED // TOTAL: {messages.length}
            </div>
          </div>

          <div className="h-[360px] sm:h-[440px] overflow-y-auto bg-zinc-50/20 dark:bg-black/15 p-4 sm:p-6 space-y-4 sm:space-y-5 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800">
            {loading ? (
              <ChatSkeleton />
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((m) => {
                  const mine = user?.email === m.user_email;
                  const dev =
                    m.user_email === "abdullahramadan.e@gmail.com" ||
                    developerEmails.includes(m.user_email);

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${mine ? "justify-end" : "justify-start"} group`}
                    >
                      <div
                        className={`flex gap-2.5 max-w-[90%] sm:max-w-[80%] items-start ${mine ? "flex-row-reverse" : ""}`}
                      >
                        <img
                          src={
                            m.user_avatar ||
                            `https://ui-avatars.com/api/?name=${m.user_name}&background=6366f1&color=fff`
                          }
                          className="w-7 h-7 sm:w-9 sm:h-9 border-2 border-zinc-950 dark:border-zinc-700 rounded-none object-cover shadow-[2px_2px_0px_0px_#000000] dark:shadow-none shrink-0 mt-0.5 select-none"
                          alt=""
                        />

                        <div className="flex flex-col gap-1 w-full min-w-0 font-mono">
                          <div
                            className={`flex items-center gap-1.5 select-none ${mine ? "flex-row-reverse" : ""}`}
                          >
                            <span className="font-mono font-black text-[10px] tracking-wide text-zinc-700 dark:text-zinc-300 truncate flex items-center gap-1">
                              {m.user_name}
                              {dev && (
                                <motion.i
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: 1 }}
                                  className="ri-checkbox-circle-fill text-blue-500 dark:text-cyan-400 text-xs drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]"
                                  title="Verified Core Developer"
                                />
                              )}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 text-[6px] sm:text-[7px] font-black border border-zinc-950 shrink-0 shadow-[1px_1px_0px_0px_#000000] dark:shadow-none
    ${
      dev
        ? "bg-emerald-500 text-zinc-950 font-bold border-emerald-600"
        : mine
          ? "bg-indigo-500 text-white border-indigo-600"
          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700"
    }`}
                            >
                              {dev ? "CORE_DEV" : mine ? "YOU" : "GUEST"}
                            </span>
                          </div>

                          <div
                            className={`p-3 border-2 text-xs shadow-[3px_3px_0px_0px_#000000] dark:shadow-none relative transition-all group-hover:border-indigo-500 dark:group-hover:border-indigo-400
                            ${
                              mine
                                ? "bg-zinc-950 text-emerald-400 border-zinc-950 dark:bg-indigo-600 dark:text-white dark:border-indigo-700"
                                : dev
                                  ? "bg-emerald-500/5 text-zinc-900 dark:text-emerald-300 border-emerald-500 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.15)]"
                                  : "bg-white dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                            }`}
                          >
                            {m.reply_to && (
                              <div
                                className={`mb-2.5 p-2 border-l-2 text-[10px] opacity-80 flex items-center gap-1.5 truncate ${mine ? "border-emerald-500 bg-white/5 text-emerald-300" : "border-zinc-400 bg-zinc-100 dark:bg-zinc-950 text-zinc-500"}`}
                              >
                                <MessageCircle className="w-3 h-3 flex-shrink-0 opacity-60" />
                                <div className="truncate">
                                  <span className="font-black">
                                    @{m.reply_to.user_name}:
                                  </span>{" "}
                                  {m.reply_to.content}
                                </div>
                              </div>
                            )}
                            <div className="break-words whitespace-pre-wrap leading-relaxed pr-1 font-medium">
                              {m.content}
                            </div>

                            <div
                              className={`mt-2 text-[7px] tracking-tighter opacity-40 text-right ${mine ? "text-emerald-400 dark:text-indigo-200" : "text-zinc-500"}`}
                            >
                              {formatMessageTime(m.created_at)}
                            </div>
                          </div>
                        </div>

                        {user && (
                          <button
                            onClick={() => setReplyingTo(m)}
                            className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 active:scale-90 shrink-0 self-center border border-transparent hover:border-dashed hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm cursor-pointer ${mine ? "mr-1" : "ml-1"}`}
                          >
                            <Reply className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-col border-t-4 border-zinc-950 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/20 font-mono">
            <AnimatePresence>
              {replyingTo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b-2 border-zinc-950 dark:border-zinc-800 flex justify-between items-center overflow-hidden"
                >
                  <div className="flex flex-col gap-0.5 truncate pr-4 border-l-4 border-indigo-500 pl-2 min-w-0">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                      // ANSWER_TO: @{replyingTo.user_name}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate italic">
                      "{replyingTo.content}"
                    </span>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4">
              {user ? (
                <div className="flex gap-2">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 bg-white dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-800 p-3 font-mono text-xs outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all dark:text-white placeholder:text-zinc-400 rounded-none shadow-inner"
                    placeholder="Enter transmission log..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={sendMessage}
                    className="bg-indigo-600 dark:bg-indigo-500 text-white px-5 font-black text-xs hover:bg-indigo-700 transition-all flex items-center gap-1.5 border-2 border-zinc-950 shadow-[2px_2px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer rounded-none"
                  >
                    {sending ? (
                      <Loader2 className="animate-spin w-3.5 h-3.5" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> <span>SEND.SH</span>
                      </>
                    )}
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    supabase.auth.signInWithOAuth({ provider: "google" })
                  }
                  className="w-full bg-white dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-800 p-3 font-mono text-xs font-black flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all dark:text-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-none cursor-pointer rounded-none"
                >
                  <LogIn className="w-4 h-4 text-indigo-500 shrink-0 animate-pulse" />{" "}
                  INITIALIZE_OAUTH // CONNECT_GOOGLE_ACCOUNT
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
