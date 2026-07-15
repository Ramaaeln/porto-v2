import { useState, useEffect } from 'react'
import { Terminal, User, Sparkles, Code, Cpu, Smartphone } from 'lucide-react'
import { motion } from 'framer-motion'
import Profile from '../../assets/profiles/profile.png'
import 'remixicon/fonts/remixicon.css'

function AboutSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start select-none pointer-events-none">
      <div className="md:col-span-1 flex flex-col">
        <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] space-y-4">
          <motion.div 
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700" 
          />
          <div className="border-t-2 border-zinc-950 dark:border-zinc-800 pt-3 space-y-4">
            <div className="h-3.5 bg-zinc-300 dark:bg-zinc-800 rounded-none w-3/4 mx-auto" />
            <div className="flex justify-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 border-2 border-zinc-950 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800" />
              ))}
            </div>
            <div className="space-y-3 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-2 bg-zinc-300 dark:bg-zinc-800 w-1/2" />
                  <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]">
          <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-2 border-b-4 border-zinc-950 flex items-center justify-between">
            <div className="h-3 bg-zinc-700 rounded-none w-24" />
            <div className="w-4 h-4 bg-zinc-700 border-2 border-zinc-600" />
          </div>
          <motion.div 
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
            className="p-6 space-y-4"
          >
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-full" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-[92%]" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-[85%]" />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] space-y-2">
              <div className="h-3 bg-zinc-300 dark:bg-zinc-800 w-1/3" />
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 w-full" />
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 w-[75%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [loading, setLoading] = useState(true)

  const techTags = ['React.js', 'Next.js', 'Node.js', 'Supabase', 'Flutter', 'Kotlin', 'Figma']

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0c0c0e] transition-colors duration-500 pt-22 p-6 md:p-12 overflow-hidden selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/[0.02] blur-[120px] rounded-full pointer-events-none select-none" />
      
      <div className="absolute top-[20%] left-[8%] font-mono text-[30px] opacity-[0.03] dark:opacity-[0.02] text-zinc-950 dark:text-white select-none pointer-events-none">＋</div>
      <div className="absolute bottom-[30%] right-[10%] font-mono text-[40px] opacity-[0.03] dark:opacity-[0.02] text-zinc-950 dark:text-white select-none pointer-events-none">■</div>
      <div className="absolute top-[60%] left-[12%] font-mono text-[24px] opacity-[0.03] dark:opacity-[0.02] text-zinc-950 dark:text-white select-none pointer-events-none">▰▰▱</div>

      <div className="w-full max-w-5xl z-10 space-y-12">
        
        <div className="flex flex-col items-center text-center space-y-3 select-none">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <User className="w-3.5 h-3.5" />
            01 . Biography
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-zinc-950 dark:text-zinc-50">
            About Me
          </h2>
        </div>

        {loading ? (
          <AboutSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            <div className="md:col-span-1 flex flex-col">
              <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] transform hover:-translate-y-1 transition-transform duration-300 space-y-4">
                <div className="w-full aspect-square bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 flex items-center justify-center overflow-hidden relative group">
                  <img 
                    src={Profile} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-none filter contrast-[1.05] brightness-[0.95]" 
                  />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/30 transition-colors pointer-events-none" />
                </div>
                
                <div className="text-center border-t-2 border-zinc-950 dark:border-zinc-800 pt-3 space-y-4">
                  <div className="space-y-2">
                    <p className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider text-zinc-950 dark:text-zinc-50 break-words">
                      ABDULLAH RAMADAN ELANSARY
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                      <a 
                        href="https://github.com/Ramaaeln" 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 border-2 border-zinc-950 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center text-base"
                      >
                        <i className="ri-github-fill"></i>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/ramaelansary/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 border-2 border-zinc-950 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center text-base"
                      >
                        <i className="ri-linkedin-box-fill"></i>
                      </a>
                      <a 
                        href="https://instagram.com/ramdneln" 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 border-2 border-zinc-950 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center text-base"
                      >
                        <i className="ri-instagram-line"></i>
                      </a>
                      <a 
                        href="https://tiktok.com/@ramadan.eln" 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 border-2 border-zinc-950 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center text-base"
                      >
                        <i className="ri-tiktok-fill"></i>
                      </a>
                      <a 
                        href="mailto:abdullahramadanelansary@gmail.com"
                        className="p-1.5 border-2 border-zinc-950 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center text-base"
                      >
                        <i className="ri-mail-line"></i>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Code className="w-3 h-3 text-rose-500" /> FRONTEND INTERMEDIATE
                        </span>
                        <span className="text-rose-500 dark:text-rose-400">95%</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 p-[1px]">
                        <div className="h-full bg-rose-500 w-[95%]" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3 h-3 text-indigo-500" /> BACKEND INTERMEDIATE
                        </span>
                        <span className="text-indigo-500 dark:text-indigo-400">85%</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 p-[1px]">
                        <div className="h-full bg-indigo-500 w-[85%]" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Smartphone className="w-3 h-3 text-emerald-500" /> MOBILE FAMILIAR
                        </span>
                        <span className="text-emerald-500 dark:text-emerald-400">50%</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 p-[1px]">
                        <div className="h-full bg-emerald-500 w-[50%]" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <i className="ri-figma-line text-[11px] text-amber-500 leading-none"></i> FIGMA (UI/UX) FAMILIAR
                        </span>
                        <span className="text-amber-500 dark:text-amber-400">50%</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 p-[1px]">
                        <div className="h-full bg-amber-500 w-[50%]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 justify-center select-none">
                    {techTags.map((tech) => (
                      <span key={tech} className="font-mono text-[9px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 border border-zinc-300 dark:border-zinc-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              
              <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] transition-all">
                <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-2 flex items-center justify-between border-b-4 border-zinc-950 select-none">
                  <div className="flex items-center gap-2 text-white">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">system_profile.sh</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-4 h-4 border-2 border-zinc-700 dark:border-zinc-600 bg-zinc-800 dark:bg-zinc-700 text-white font-mono text-[8px] font-bold flex items-center justify-center hover:bg-indigo-500 dark:hover:bg-indigo-500 hover:border-zinc-950 transition-colors cursor-pointer"
                    >
                      {isMinimized ? '＋' : '－'}
                    </button>
                  </div>
                </div>
                
                <div className={`p-6 font-mono text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-4 transition-all duration-300 ${isMinimized ? 'h-0 py-0 overflow-hidden opacity-0' : 'opacity-100'}`}>
                  <p>
                    &gt; I am an Informatics Engineering student at Universitas Pamulang, highly focused on engineering scalable web architectures, full-stack ecosystems, and interactive intelligence integrations.
                  </p>
                  <p>
                    &gt; My development workflow heavily revolves around building strictly typed production engines, modular infrastructure, and performance-driven mobile solutions that balance modern speed with clean retro aesthetics.
                  </p>
                  <p>
                    &gt; Driven by building tools that work in the real world, I actively engineer bridges between reactive interfaces, custom backend pipelines, and interactive database structures like Supabase to solve technical problems efficiently.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] group hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                  <h4 className="font-mono font-bold text-xs text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 fill-current" /> Core Focus
                  </h4>
                  <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                    Architecting robust enterprise systems, secure real-time activity tracking modules, and end-to-end data pipelines.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] group hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors">
                  <h4 className="font-mono font-bold text-xs text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span>■</span> Current Status
                  </h4>
                  <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                    Open for software engineering internships, technical collaborations, and building specialized digital products.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  )
}