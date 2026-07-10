import { useState, useEffect } from 'react'
import { Code2, Terminal, Layers, Database, Cpu, Globe, Zap, Flame, ArrowDown } from 'lucide-react'
import HeroMako from '../ui/HeroMako'

export default function HeroSection() {
  const roles = ['Full Stack Web Developer', 'Software Engineer', 'AI Integrator']
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex]
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setTypingSpeed(80)
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setTypingSpeed(40)
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }
    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentRoleIndex])

  const floatingIcons = [
    { Icon: Code2, label: 'React', pos: 'top-[12%] left-[8%] md:top-[15%] md:left-[12%]', anim: 'animate-[float_4s_infinite_ease-in-out]' },
    { Icon: Layers, label: 'Next.js', pos: 'top-[14%] right-[8%] md:top-[16%] md:right-[12%]', anim: 'animate-[float_4.5s_infinite_ease-in-out_0.2s]' },
    { Icon: Cpu, label: 'Node.js', pos: 'bottom-[35%] left-[5%] md:bottom-[40%] md:left-[10%]', anim: 'animate-[float_5s_infinite_ease-in-out_0.4s]' },
    { Icon: Database, label: 'Supabase', pos: 'bottom-[32%] right-[5%] md:bottom-[36%] md:right-[10%]', anim: 'animate-[float_4.8s_infinite_ease-in-out_0.1s]' },
    { Icon: Terminal, label: 'Express', pos: 'top-[42%] left-[4%] md:top-[45%] md:left-[14%]', anim: 'animate-[float_3.8s_infinite_ease-in-out_0.6s]' },
    { Icon: Zap, label: 'Vite', pos: 'bottom-[14%] left-[10%] md:bottom-[18%] md:left-[16%]', anim: 'animate-[float_3.5s_infinite_ease-in-out_0.3s]' },
    { Icon: Globe, label: 'JavaScript', pos: 'top-[45%] right-[4%] md:top-[48%] md:right-[15%]', anim: 'animate-[float_5.2s_infinite_ease-in-out_0.5s]' },
    { Icon: Flame, label: 'Postman', pos: 'bottom-[16%] right-[8%] md:bottom-[20%] md:right-[18%]', anim: 'animate-[float_4.2s_infinite_ease-in-out_0.7s]' },
  ]

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#fafafa] dark:bg-[#0c0c0e] transition-colors duration-500 p-6 md:p-12 selection:bg-indigo-500/30 selection:text-zinc-900 dark:selection:text-zinc-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .pixel-grid {
          background-size: 24px 24px;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
        }
        .dark .pixel-grid {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
        }
      `}</style>

      <div className="absolute inset-0 pixel-grid pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full flex flex-col items-center text-center mt-12 md:mt-24 z-30 space-y-6 select-none">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-700 dark:text-zinc-300 font-mono uppercase">
          Hi, u can call me <span className="text-indigo-500 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-400/5 px-3 py-1 rounded-none border-2 border-dashed border-indigo-500/20">RAMAAA</span>
        </h1>

        <div className="inline-flex items-center gap-3 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-4 border-zinc-950 dark:border-zinc-800 px-5 py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] min-h-[48px] transition-all transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
          <Terminal className="w-4 h-4 text-indigo-400 dark:text-indigo-500" />
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase">
            {currentText}
            <span className="text-indigo-400 dark:text-indigo-500 font-bold animate-[blink_0.8s_infinite_step-start]">|</span>
          </span>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-hidden">
        {floatingIcons.map(({ Icon, label, pos, anim }, index) => (
          <div
            key={index}
            className={`absolute flex items-center gap-2.5 bg-white/80 dark:bg-zinc-900/80 p-2.5 px-3.5 border-2 border-zinc-950 dark:border-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] rounded-none backdrop-blur-sm transition-all duration-500 will-change-transform pointer-events-auto hover:scale-105 ${pos} ${anim}`}
          >
            <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 stroke-[2]" />
            <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative w-full flex items-center justify-center pointer-events-none select-none my-auto z-10 py-12">
        <div className="transform scale-[0.85] sm:scale-100 md:scale-110 lg:scale-125 drop-shadow-[0_0_30px_rgba(0,0,0,0.02)] dark:drop-shadow-[0_0_50px_rgba(99,102,241,0.15)] transition-all">
          <HeroMako />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 z-40 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800/40 pt-6 mt-auto">
        <div className="flex items-center gap-2.5 order-2 md:order-1">
          <span className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 inline-block border border-zinc-950 dark:border-zinc-900 animate-pulse" />
          <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">Available for projects</p>
        </div>

        <div className="order-1 md:order-2 transform hover:-translate-y-0.5 transition-transform">
          <a
            href="#projects"
            className="flex items-center gap-2.5 text-[10px] font-mono font-bold tracking-widest text-zinc-700 dark:text-zinc-300 uppercase bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]"
          >
            Explore Projects
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-indigo-400 dark:text-indigo-500" />
          </a>
        </div>

        <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 tracking-widest order-3 hidden md:block">
          © 2026 RAMA. ALL RIGHTS RESERVED
        </p>
      </div>
    </section>
  )
}