import { useState, useEffect } from 'react'
import { Terminal, User, Heart, Shield, Sparkles, GitBranch } from 'lucide-react'
import Profile from '../../assets/profiles/profile.png'

export default function AboutSection() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [cacheKey, setCacheKey] = useState('')

  useEffect(() => {
    setCacheKey(new Date().getTime().toString())
  }, [])

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0c0c0e] transition-colors duration-500 p-6 md:p-12 overflow-hidden selection:bg-indigo-500/30">
      
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
              
              <div className="text-center border-t-2 border-zinc-950 dark:border-zinc-800 pt-3 space-y-3">
                <p className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider text-zinc-950 dark:text-zinc-50 break-words">
                  ABDULLAH RAMADAN ELANSARY
                </p>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500 fill-current" /> NEXT.JS / REACT
                      </span>
                      <span className="text-rose-500 dark:text-rose-400">100%</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 p-[1px]">
                      <div className="h-full bg-rose-500 w-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-indigo-500 fill-current" /> NODE / AI INT.
                      </span>
                      <span className="text-indigo-500 dark:text-indigo-400">85%</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 p-[1px]">
                      <div className="h-full bg-indigo-500 w-[85%]" />
                    </div>
                  </div>
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
                  &gt; I am an Informatics Engineering student currently focused on exploring the horizons of software architecture, full-stack ecosystems, and intelligence integration.
                </p>
                <p>
                  &gt; My engineering philosophy revolves around building robust, strictly typed web applications and interactive pixel-perfect interfaces that strike a balance between structural efficiency and nostalgic retro aesthetics.
                </p>
                <p>
                  &gt; Beyond writing standard logic, I actively deep dive into bridge-building between classic backend structures and custom modern AI pipelines, constantly seeking clean ways to solve contextual problems.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] group hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                <h4 className="font-mono font-bold text-xs text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> Core Focus
                </h4>
                <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                  Architecting scalable web engines, creating modular components, and writing reliable automated integrations.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] group hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors">
                <h4 className="font-mono font-bold text-xs text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span>■</span> Current Status
                </h4>
                <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                  Open for technical collaboration, digital product engineering, and advanced stack optimization workflows.
                </p>
              </div>
            </div>

            <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
              <h4 className="font-mono font-bold text-xs text-zinc-950 dark:text-zinc-50 uppercase tracking-widest mb-3 flex items-center gap-2 border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-2">
                <GitBranch className="w-4 h-4 text-indigo-500 animate-pulse" /> GitHub Engine Status
              </h4>
              <div className="w-full overflow-hidden flex items-center justify-center p-2 bg-zinc-950 border-2 border-zinc-800 rounded-none min-h-[120px]">
                {cacheKey && (
                  <img 
                    src={`https://github-readme-stats.vercel.app/api?username=Ramaaeln&show_icons=true&theme=dark&hide_border=true&bg_color=0c0c0e&title_color=6366f1&icon_color=10b981&text_color=a1a1aa&cache_seconds=60&t=${cacheKey}`} 
                    alt="GitHub Stats"
                    className="w-full max-w-md h-auto object-contain filter select-none pointer-events-none"
                  />
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}