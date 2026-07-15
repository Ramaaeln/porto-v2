import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { Terminal, Send, MessageSquare, Loader2, LogOut, LogIn, ShieldAlert, Cpu, Reply, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";

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

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateStr = date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
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
    let ignore = false; // Bendera untuk menangani StrictMode / double-render

    const initialize = async () => {
      setLoading(true);
      try {
        // 1. Ambil Session User
        const { data: { session } } = await supabase.auth.getSession();
        if (ignore) return;
        setUser(session?.user ?? null);
        
        // 2. Ambil Profile User (Jika sudah login)
        if (session?.user) {
          const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
          if (ignore) return;
          setProfile(data);
        }
        
        // 3. Ambil List Email Developer
        const { data: devs } = await supabase.from("profiles").select("email").eq("role", "developer");
        if (ignore) return;
        if (devs) setDeveloperEmails(devs.map((d) => d.email));
        
        // 4. Ambil History Chat
        const { data: msgs } = await supabase.from("messages").select("*").order("created_at", { ascending: true });
        if (ignore) return;
        if (msgs) setMessages(msgs);
        
        // 5. Setup Realtime Channel (Hanya dibuat jika render ini masih valid)
        const chatChannel = supabase.channel("public-chat")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            (payload) => {
              setMessages((prev) => {
                if (prev.some((msg) => msg.id === payload.new.id)) return prev;
                return [...prev, payload.new];
              });
            }
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

    // Fungsi Pembersihan (Cleanup): Dipanggil secara instan oleh StrictMode saat re-render
    return () => {
      ignore = true; // Batalkan semua proses state update dari fetch yang sedang berjalan
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const sendMessage = async () => {
    if (!text.trim() || !user || sending) return;
    setSending(true);
    const displayName = profile?.display_name || user.user_metadata?.full_name || "Anonymous";
    
    const payload = {
      content: text.trim(),
      user_name: displayName,
      user_avatar: profile?.user_avatar || user.user_metadata?.avatar_url,
      user_email: user.email,
      reply_to: replyingTo ? {
        id: replyingTo.id,
        user_name: replyingTo.user_name,
        content: replyingTo.content
      } : null
    };

    await supabase.from("messages").insert([payload]);
    
    setText("");
    setReplyingTo(null);
    setSending(false);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#fafafa] dark:bg-[#0c0c0e] pt-20 md:pt-24 px-3 sm:px-6 py-12 md:py-16 transition-colors duration-500 overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[280px] bg-indigo-500/5 dark:bg-indigo-500/[0.02] blur-[70px] sm:blur-[130px] rounded-full pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-6 sm:space-y-10">
        
        <div className="flex flex-col items-center text-center space-y-2 select-none">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" /> 05 . Contact
          </motion.div>
          <h2 className="text-xl sm:text-5xl font-black font-mono uppercase text-zinc-950 dark:text-zinc-50">Broadcast_Room.log</h2>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 select-none w-full">
          {[
            { name: 'GITHUB', icon: 'ri-github-fill', link: 'https://github.com/Ramaaeln' },
            { name: 'LINKEDIN', icon: 'ri-linkedin-box-fill', link: 'https://www.linkedin.com/in/ramaelansary/' },
            { name: 'INSTAGRAM', icon: 'ri-instagram-line', link: 'https://instagram.com/ramdneln' },
            { name: 'EMAIL', icon: 'ri-mail-line', link: 'mailto:abdullahramadanelansary@gmail.com' },
          ].map((social) => (
            <motion.a key={social.name} href={social.link} target="_blank" rel="noreferrer" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.05)] text-zinc-950 dark:text-zinc-50 font-mono text-[9px] sm:text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-zinc-950 transition-all">
              <i className={`${social.icon} text-xs sm:text-sm`}></i> {social.name}
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-zinc-900 border-2 sm:border-4 border-zinc-950 dark:border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] flex flex-col">
          
          <div className="bg-zinc-950 dark:bg-zinc-800 px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b-2 sm:border-b-4 border-zinc-950 select-none">
            <div className="flex items-center gap-2 w-full mr-2 overflow-hidden">
              <div className="flex gap-1 mr-1 shrink-0">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ef4444] border border-black/40"></span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#eab308] border border-black/40"></span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22c55e] border border-black/40"></span>
              </div>
              <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-200 truncate">PUBLIC_CHAT_STREAM.EXE</span>
            </div>
            {user && (
              <button onClick={handleLogout} className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0">
                <LogOut className="w-3 h-3" /> <span className="hidden sm:inline">DISCONNECT</span>
              </button>
            )}
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-950/60 border-b-2 border-zinc-950 dark:border-zinc-800 px-3 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between text-[8px] sm:text-[9px] font-mono font-bold text-zinc-500 dark:text-zinc-400 select-none gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1"><Cpu className="w-2.5 h-2.5 text-indigo-500" /> <span className="hidden sm:inline">SERVER:</span> ON</span>
              <span className="flex items-center gap-1"><ShieldAlert className="w-2.5 h-2.5 text-emerald-500" /> <span className="hidden sm:inline">ENCRYPTION:</span> SECURE</span>
            </div>
            <div className="truncate">LOG: SYNCED</div>
          </div>

          <div className="h-[340px] sm:h-[420px] overflow-y-auto bg-zinc-50/30 dark:bg-black/20 p-3 sm:p-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-indigo-500 space-y-2 select-none font-mono text-xs font-bold uppercase">
                <Loader2 className="animate-spin w-6 h-6" />
                <span className="tracking-wider opacity-80 text-[10px]">Fetching logs...</span>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((m) => {
                  const mine = user?.email === m.user_email;
                  const dev = m.user_email === "abdullahramadan.e@gmail.com" || developerEmails.includes(m.user_email);
                  
                  return (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${mine ? "justify-end" : "justify-start"} group`}>
                      <div className={`flex gap-2 sm:gap-3 max-w-[95%] sm:max-w-[85%] items-start ${mine ? "flex-row-reverse" : ""}`}>
                        
                        <img src={m.user_avatar || `https://ui-avatars.com/api/?name=${m.user_name}&background=6366f1&color=fff`} className="w-6 h-6 sm:w-9 sm:h-9 border-[1px] sm:border-2 border-zinc-950 dark:border-zinc-700 rounded-none object-cover shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-none shrink-0 mt-0.5" alt="avatar" />
                        
                        <div className="flex flex-col gap-0.5 w-full min-w-0">
                          <div className={`flex items-center gap-1.5 select-none ${mine ? "flex-row-reverse" : ""}`}>
                            <span className="font-mono font-black text-[9px] sm:text-[10px] tracking-wide text-zinc-600 dark:text-zinc-400 truncate max-w-[90px] sm:max-w-none">{m.user_name}</span>
                            <span className={`px-1 py-0.5 text-[5px] sm:text-[7px] font-black font-mono border-[1px] border-zinc-950 shrink-0 ${dev ? "bg-emerald-500 text-zinc-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" : "bg-indigo-600 text-white border-indigo-700"}`}>
                              {dev ? "CORE_DEV" : "GUEST"}
                            </span>
                          </div>
                          
                          <div className={`p-2 sm:p-3 border-2 text-[11px] sm:text-xs font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none ${mine ? "bg-zinc-950 text-emerald-400 border-zinc-950 dark:bg-indigo-600 dark:text-white dark:border-indigo-700" : "bg-white dark:bg-zinc-800 border-zinc-950 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"}`}>
                            {m.reply_to && (
                              <div className={`mb-2 p-1.5 border-l-2 sm:border-l-4 text-[9px] sm:text-[10px] opacity-80 ${mine ? "border-emerald-500/50 bg-white/5" : "border-zinc-400 bg-zinc-100 dark:bg-zinc-950 dark:border-zinc-600"}`}>
                                <div className="font-bold truncate">@{m.reply_to.user_name}</div>
                                <div className="truncate text-[8px] sm:text-[9px]">{m.reply_to.content}</div>
                              </div>
                            )}
                            <div className="break-words whitespace-pre-wrap pr-1">{m.content}</div>
                            
                            <div className={`mt-1 text-[7px] font-mono tracking-tighter opacity-40 text-right ${mine ? "text-emerald-400" : "text-zinc-500 dark:text-zinc-400"}`}>
                              {formatMessageTime(m.created_at)}
                            </div>
                          </div>
                        </div>

                        {user && (
                          <button onClick={() => setReplyingTo(m)} className={`opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 active:scale-95 shrink-0 self-center ${mine ? "mr-0.5" : "ml-0.5"}`}>
                            <Reply className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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

          <div className="flex flex-col border-t-2 sm:border-t-4 border-zinc-950 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50">
            
            <AnimatePresence>
              {replyingTo && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-zinc-200 dark:bg-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 border-b-2 border-zinc-950 dark:border-zinc-700 flex justify-between items-center overflow-hidden">
                  <div className="flex flex-col gap-0.5 truncate pr-2 border-l-4 border-indigo-500 pl-2 min-w-0">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400">
                      Replying to @{replyingTo.user_name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-zinc-700 dark:text-zinc-300 truncate">
                      {replyingTo.content}
                    </span>
                  </div>
                  <button onClick={() => setReplyingTo(null)} className="p-1 text-zinc-500 hover:text-rose-500 transition-colors shrink-0">
                    <X className="w-3.5 h-3.5 sm:w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-2.5 sm:p-4">
              {user ? (
                <div className="flex gap-2">
                  <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 bg-white dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-700 p-2 sm:p-3 font-mono text-[11px] sm:text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all dark:text-white placeholder:text-zinc-400" placeholder="Transmission line..." />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} onClick={sendMessage} className="bg-indigo-600 text-white px-3.5 sm:px-6 font-mono font-black text-[11px] sm:text-xs hover:bg-indigo-700 transition-all flex items-center gap-1.5 border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    {sending ? <Loader2 className="animate-spin w-3 h-3" /> : <><Send className="w-3 h-3" /> <span className="hidden sm:inline">SEND.SH</span></>}
                  </motion.button>
                </div>
              ) : (
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })} className="w-full bg-white dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-700 p-2.5 sm:p-3 font-mono text-[9px] sm:text-xs font-black flex items-center justify-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                  <LogIn className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> LOGIN VIA GOOGLE
                </motion.button>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}