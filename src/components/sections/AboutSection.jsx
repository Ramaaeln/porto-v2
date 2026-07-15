import { useState, useEffect } from 'react'
import { Terminal, User, Sparkles, Code, Cpu, Smartphone, ShieldCheck, Activity, Clock, TerminalSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Profile from '../../assets/profiles/profile.png'
import 'remixicon/fonts/remixicon.css'

function AboutSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[8px_8px_0px_0px_rgba(99,102,241,0.15)] min-h-[480px] flex flex-col divide-y-4 divide-zinc-950 dark:divide-zinc-800 select-none pointer-events-none">
      <div className="bg-zinc-950 px-4 py-3 flex items-center justify-between">
        <div className="h-4 bg-zinc-800 w-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-zinc-950 dark:divide-zinc-800 flex-1">
        <div className="md:col-span-5 p-6 flex flex-col items-center space-y-4">
          <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 border-4 border-zinc-950 animate-pulse" />
        </div>
        <div className="md:col-span-7 p-6 space-y-6">
          <div className="h-40 bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-950 w-full" />
        </div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [systemTime, setSystemTime] = useState('12:00:00')
  const [ramUsage, setRamUsage] = useState('412MB')

  const techTags = ['React.js', 'Next.js', 'Node.js', 'Supabase', 'Flutter', 'Kotlin', 'Figma']

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date()
      setSystemTime(now.toTimeString().split(' ')[0])
    }, 1000)

    const ramInterval = setInterval(() => {
      const usage = Math.floor(Math.random() * (440 - 405 + 1) + 405)
      setRamUsage(`${usage}MB`)
    }, 3000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(ramInterval)
    }
  }, [])

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#070709] transition-colors duration-500 pt-22 p-4 sm:p-6 md:p-12 overflow-hidden selection:bg-indigo-500/40">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2] pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px'
        }} 
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none select-none" />

      <style>{`
        .crt-screen {
          position: relative;
        }
        .crt-screen::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          z-index: 5;
          background-size: 100% 4px, 4px 100%;
          pointer-events: none;
        }
      `}</style>

      <div className="w-full max-w-5xl z-10 space-y-8">
        
        <div className="flex flex-col items-center text-center space-y-3 select-none">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/15 px-3 py-1 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(99,102,241,0.2)]">
            <User className="w-3.5 h-3.5" />
            01 . Biography
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-zinc-950 dark:text-zinc-50 drop-shadow-[3px_3px_0px_rgba(99,102,241,0.35)]">
            About Me
          </h2>
        </div>

        {loading ? (
          <AboutSkeleton />
        ) : (
          <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[10px_10px_0px_0px_#6366f1] dark:shadow-[10px_10px_0px_0px_#4f46e5] flex flex-col relative rounded-none overflow-hidden">
            
            <div className="bg-zinc-950 px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-4 border-zinc-950 select-none font-mono">
              <div className="flex items-center gap-3 text-white">
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-3 h-3 bg-indigo-500 border-2 border-zinc-950 rounded-none animate-ping" style={{ animationDuration: '2s' }}></span>
                  <span className="w-3 h-3 bg-purple-500 border-2 border-zinc-950 rounded-none"></span>
                  <span className="w-3 h-3 bg-pink-500 border-2 border-zinc-950 rounded-none"></span>
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400 animate-pulse" /> MAINFRAME_OS // CORE.SYS
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider bg-zinc-900 px-3 py-1 border border-zinc-800">
                <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-emerald-400" /> RAM: {ramUsage}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-indigo-400" /> TIME: {systemTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-zinc-950 dark:divide-zinc-800">
              
              <div className="md:col-span-5 p-6 flex flex-col bg-zinc-50/80 dark:bg-[#121217] font-mono justify-between gap-6 relative">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                <div className="space-y-4 w-full flex flex-col items-stretch z-10">
                  <div className="w-full aspect-square bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-700 p-1.5 shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] overflow-hidden relative group">
                    <img 
                      src={Profile} 
                      alt="Profile" 
                      className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.95] group-hover:scale-105 transition-transform duration-300" 
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div className="absolute inset-0 bg-indigo-500/5 mix-blend-color pointer-events-none" />
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h3 className="text-sm font-black uppercase text-zinc-950 dark:text-zinc-50 tracking-wider">
                      ABDULLAH RAMADAN E.
                    </h3>
                    <div className="inline-block text-[9px] font-black bg-indigo-600 text-white dark:bg-indigo-500 px-2.5 py-1 uppercase tracking-widest mt-1 border-2 border-zinc-950 shadow-[2px_2px_0px_0px_#000000]">
                      SOFTWARE ENGINEER
                    </div>
                  </div>
                </div>

                <div className="space-y-4 w-full z-10">
                  <div className="flex flex-wrap justify-center md:justify-start gap-1.5 border-2 border-zinc-950 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900 w-full shadow-[4px_4px_0px_0px_#000000] dark:shadow-none">
                    {techTags.map((tech) => (
                      <span key={tech} className="text-[8px] font-black bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-400 px-2 py-0.5 uppercase tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center md:justify-start gap-2.5 w-full">
                    {['ri-github-fill', 'ri-linkedin-box-fill', 'ri-instagram-line', 'ri-tiktok-fill', 'ri-mail-line'].map((icon, i) => {
                      const links = [
                        'https://github.com/Ramaaeln',
                        'https://www.linkedin.com/in/ramaelansary/',
                        'https://instagram.com/ramdneln',
                        'https://tiktok.com/@ramadan.eln',
                        'mailto:abdullahramadanelansary@gmail.com'
                      ];
                      return (
                        <a 
                          key={i}
                          href={links[i]} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 border-2 border-zinc-950 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 shadow-[3px_3px_0px_0px_#000000] hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center text-sm cursor-pointer"
                        >
                          <i className={icon}></i>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 p-4 sm:p-6 flex flex-col gap-6 font-mono justify-between crt-screen bg-zinc-50 dark:bg-[#0c0c10]">
                
                <div className="border-4 border-zinc-950 dark:border-zinc-800 shadow-[5px_5px_0px_0px_#000000] dark:shadow-[5px_5px_0px_0px_rgba(99,102,241,0.1)] bg-white dark:bg-zinc-900">
                  <div className="bg-zinc-950 px-3 py-2 flex items-center justify-between border-b-4 border-zinc-950 text-white text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><TerminalSquare className="w-4 h-4 text-indigo-400" /> Bash_Terminal.sh</span>
                    <button onClick={() => setIsMinimized(!isMinimized)} className="cursor-pointer hover:text-indigo-400 font-mono text-[9px] font-black border-2 border-zinc-700 px-2 py-0.5 bg-zinc-900 active:translate-y-[1px]">
                      {isMinimized ? 'SYS_EXPAND' : 'SYS_HIDE'}
                    </button>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {!isMinimized && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "tween", ease: "steps(4, end)", duration: 0.2 }}
                        className="p-4 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-4 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20"
                      >
                        <p className="border-l-2 border-indigo-500 dark:border-indigo-400 pl-2">&gt; I am an Informatics Engineering student at Universitas Pamulang, highly focused on engineering scalable web architectures, full-stack ecosystems, and interactive intelligence integrations.</p>
                        <p className="border-l-2 border-indigo-500 dark:border-indigo-400 pl-2">&gt; My development workflow heavily revolves around building strictly typed production engines, modular infrastructure, and performance-driven mobile solutions that balance modern speed with clean retro aesthetics.</p>
                        <p className="border-l-2 border-indigo-500 dark:border-indigo-400 pl-2">&gt; Driven by building tools that work in the real world, I actively engineer bridges between reactive interfaces, custom backend pipelines, and interactive database structures like Supabase to solve technical problems efficiently.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border-4 border-zinc-950 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#f43f5e] dark:shadow-none group hover:scale-[1.01] transition-all">
                    <h4 className="font-black text-xs text-rose-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 fill-current animate-spin" style={{ animationDuration: '6s' }} /> Core Focus
                    </h4>
                    <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 leading-normal">
                      Architecting robust enterprise systems, secure real-time activity tracking modules, and end-to-end data pipelines.
                    </p>
                  </div>

                  <div className="p-4 border-4 border-zinc-950 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#10b981] dark:shadow-none group hover:scale-[1.01] transition-all">
                    <h4 className="font-black text-xs text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 animate-pulse" /> Current Status
                    </h4>
                    <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 leading-normal">
                      Open for software engineering internships, technical collaborations, and building specialized digital products.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  )
}