import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { Terminal, Send, MessageSquare, Loader2, LogOut, LogIn, ShieldAlert, Cpu } from "lucide-react";
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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let channel;
    const initialize = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
        setProfile(data);
      }
      const { data: devs } = await supabase.from("profiles").select("email").eq("role", "developer");
      if (devs) setDeveloperEmails(devs.map((d) => d.email));
      const { data: msgs } = await supabase.from("messages").select("*").order("created_at", { ascending: true });
      if (msgs) setMessages(msgs);
      
      channel = supabase.channel("public-chat")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        })
        .subscribe();
      setLoading(false);
    };
    initialize();
    return () => { if (channel) supabase.removeChannel(channel); };
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
    await supabase.from("messages").insert([{
      content: text.trim(),
      user_name: displayName,
      user_avatar: profile?.user_avatar || user.user_metadata?.avatar_url,
      user_email: user.email,
    }]);
    setText("");
    setSending(false);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#fafafa] dark:bg-[#0c0c0e] pt-24 px-6 py-16 transition-colors duration-500 overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/[0.02] blur-[130px] rounded-full pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-10">
        
        <div className="flex flex-col items-center text-center space-y-2 select-none">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" /> 05 . Contact
          </motion.div>
          <h2 className="text-2xl sm:text-5xl font-black font-mono uppercase text-zinc-950 dark:text-zinc-50">Broadcast_Room.log</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 select-none">
          {[
            { name: 'GITHUB', icon: 'ri-github-fill', link: 'https://github.com/Ramaaeln' },
            { name: 'LINKEDIN', icon: 'ri-linkedin-box-fill', link: 'https://www.linkedin.com/in/ramaelansary/' },
            { name: 'INSTAGRAM', icon: 'ri-instagram-line', link: 'https://instagram.com/ramdneln' },
            { name: 'EMAIL', icon: 'ri-mail-line', link: 'mailto:abdullahramadanelansary@gmail.com' },
          ].map((social) => (
            <motion.a key={social.name} href={social.link} target="_blank" rel="noreferrer" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] text-zinc-950 dark:text-zinc-50 font-mono text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-zinc-950 transition-all">
              <i className={`${social.icon} text-sm`}></i> {social.name}
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
          
          <div className="bg-zinc-950 dark:bg-zinc-800 px-5 py-3.5 flex items-center justify-between border-b-4 border-zinc-950 select-none">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5 mr-1">
                <span className="w-2 h-2 rounded-full bg-[#ef4444] border border-black/40"></span>
                <span className="w-2 h-2 rounded-full bg-[#eab308] border border-black/40"></span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-black/40"></span>
              </div>
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-200">PUBLIC_CHAT_STREAM.EXE</span>
            </div>
            {user && (
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-zinc-400 hover:text-rose-400 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors">
                <LogOut className="w-3.5 h-3.5" /> DISCONNECT
              </button>
            )}
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-950/60 border-b-2 border-zinc-950 dark:border-zinc-800 px-5 py-2 flex flex-wrap items-center justify-between text-[9px] font-mono font-bold text-zinc-500 dark:text-zinc-400 select-none gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-indigo-500" /> SERVER: ONLINE</span>
              <span className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-emerald-500" /> ENCRYPTION: ACTIVE</span>
            </div>
            <div>MUTATION_LOG: SYNCED</div>
          </div>

          <div className="h-[420px] overflow-y-auto bg-zinc-50/30 dark:bg-black/20 p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-indigo-500 space-y-2 select-none font-mono text-xs font-bold uppercase">
                <Loader2 className="animate-spin w-7 h-7" />
                <span className="tracking-wider opacity-80">Fetching logs...</span>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((m) => {
                  const mine = user?.email === m.user_email;
                  const dev = m.user_email === "abdullahramadan.e@gmail.com" || developerEmails.includes(m.user_email);
                  
                  return (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[80%] ${mine ? "flex-row-reverse" : ""}`}>
                        <img src={m.user_avatar || `https://ui-avatars.com/api/?name=${m.user_name}&background=6366f1&color=fff`} className="w-9 h-9 border-2 border-zinc-950 dark:border-zinc-700 rounded-none object-cover shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none" alt="avatar" />
                        
                        <div className="flex flex-col gap-1.5">
                          <div className={`flex items-center gap-2 select-none ${mine ? "flex-row-reverse" : ""}`}>
                            <span className="font-mono font-black text-[10px] tracking-wide text-zinc-600 dark:text-zinc-400">{m.user_name}</span>
                            <span className={`px-1.5 py-0.5 text-[7px] font-black font-mono border-2 border-zinc-950 ${dev ? "bg-emerald-500 text-zinc-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" : "bg-indigo-600 text-white border-indigo-700"}`}>
                              {dev ? "CORE_DEV" : "GUEST"}
                            </span>
                          </div>
                          
                          <div className={`p-3 border-2 text-xs font-mono break-words shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-none ${mine ? "bg-zinc-950 text-emerald-400 border-zinc-950 dark:bg-indigo-600 dark:text-white dark:border-indigo-700" : "bg-white dark:bg-zinc-800 border-zinc-950 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"}`}>
                            {m.content}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t-4 border-zinc-950 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50">
            {user ? (
              <div className="flex gap-2">
                <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 bg-white dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-700 p-3 font-mono text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all dark:text-white placeholder:text-zinc-400" placeholder="Execute transmission line..." />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} onClick={sendMessage} className="bg-indigo-600 text-white px-6 font-mono font-black text-xs hover:bg-indigo-700 transition-all flex items-center gap-2 border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                  {sending ? <Loader2 className="animate-spin w-3 h-3" /> : <><Send className="w-3 h-3" /> SEND.SH</>}
                </motion.button>
              </div>
            ) : (
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })} className="w-full bg-white dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-700 p-3 font-mono text-xs font-black flex items-center justify-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                <LogIn className="w-4 h-4 text-indigo-500" /> INITIALIZE OAUTH TERMINAL (LOGIN VIA GOOGLE)
              </motion.button>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
}