import { useState, useEffect } from 'react'
import { Code, Cpu, Smartphone, Wrench, Terminal, ChevronRight, Binary } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function SkillsSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] min-h-[400px] flex flex-col select-none pointer-events-none">
      <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-2 border-b-4 border-zinc-950 flex items-center">
        <div className="h-3.5 bg-zinc-700 w-32 rounded-none" />
      </div>
      <motion.div 
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2 p-3 bg-zinc-50/50 dark:bg-zinc-950/20 border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="h-3 bg-zinc-300 dark:bg-zinc-800 w-1/3" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 w-full" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [compiling, setCompiling] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 850)
    return () => clearTimeout(timer)
  }, [])

  const handleCategoryChange = (id) => {
    if (id === activeCategory) return
    setCompiling(true)
    setTimeout(() => {
      setActiveCategory(id)
      setCompiling(false)
    }, 250)
  }

  const skillCategories = [
    { id: 'all', name: '00 . ALL_SYS' },
    { id: 'frontend', name: '01 . FRONTEND' },
    { id: 'backend', name: '02 . BACKEND' },
    { id: 'mobile', name: '03 . MOBILE' },
    { id: 'tools', name: '04 . UTILS' }
  ]

  const skillsData = [
    { name: 'React.js', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'frontend', icon: 'ri-reactjs-line' },
    { name: 'Next.js', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'frontend', icon: 'ri-nextjs-line' },
    { name: 'Tailwind CSS', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'frontend', icon: 'ri-tailwind-css-line' },
    { name: 'JavaScript / TS', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'frontend', icon: 'ri-javascript-line' },
    
    { name: 'Node.js', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'backend', icon: 'ri-node-tree' },
    { name: 'Express.js', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'backend', icon: 'ri-server-line' },
    { name: 'Supabase / Firebase', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'backend', icon: 'ri-database-2-line' },
    { name: 'RESTful API', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'backend', icon: 'ri-code-s-slash-line' },
    
    { name: 'Flutter', tier: 'FAMILIAR', percent: 50, width: 'w-[50%]', category: 'mobile', icon: 'ri-flutter-line' },
    { name: 'Kotlin', tier: 'FAMILIAR', percent: 50, width: 'w-[50%]', category: 'mobile', icon: 'ri-android-line' },
    
    { name: 'Git / GitHub', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'tools', icon: 'ri-github-line' },
    { name: 'Vite / Webpack', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'tools', icon: 'ri-command-line' },
    { name: 'Postman', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'tools', icon: 'ri-mail-send-line' },
    { name: 'AI Integration', tier: 'INTERMEDIATE', percent: 80, width: 'w-[80%]', category: 'tools', icon: 'ri-brain-line' },
    { name: 'Figma', tier: 'FAMILIAR', percent: 50, width: 'w-[50%]', category: 'tools', icon: 'ri-figma-line' }
  ]

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory)

  const getTierBadgeStyle = (tier) => {
    switch(tier) {
      case 'INTERMEDIATE': return 'text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
      case 'FAMILIAR': return 'text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/30'
      default: return 'text-zinc-500 dark:text-zinc-400 bg-zinc-500/10 border-zinc-500/30'
    }
  }

  return (
    <section id="skills" className="pt-22 md:pt-26 relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0c0c0e] transition-colors duration-500 p-4 sm:p-6 md:p-12 overflow-hidden selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="w-full max-w-5xl z-10 space-y-6 sm:space-y-8">
        
        <div className="flex flex-col items-center text-center space-y-2 select-none">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            02 . Capabilities
          </div>
          <h2 className="text-2xl sm:text-5xl font-black font-mono uppercase tracking-tight text-zinc-950 dark:text-zinc-50">
            Skills Tree
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto select-none">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`font-mono text-[10px] sm:text-xs px-3 py-2 border-2 border-zinc-950 dark:border-zinc-800 rounded-none transform transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.05)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer
                ${activeCategory === category.id 
                  ? 'bg-indigo-500 text-white border-zinc-950 shadow-none translate-x-0.5 translate-y-0.5' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
            >
              {category.id === activeCategory ? '■ ' : '□ '}
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <SkillsSkeleton />
        ) : (
          <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] flex flex-col">
            
            <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-2.5 flex items-center justify-between border-b-4 border-zinc-950 select-none">
              <div className="flex items-center gap-2 text-white">
                <Binary className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">CAPABILITIES_MATRIX.SH // LIVE_COMPILER</span>
              </div>
              <div className="text-[9px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden sm:block">
                TOTAL_ITEMS: {filteredSkills.length}
              </div>
            </div>

            <div className="p-4 sm:p-6 min-h-[360px] relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {compiling ? (
                  <motion.div
                    key="compiler"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 select-none"
                  >
                    <i className="ri-loader-2-fill animate-spin text-sm"></i> COMPILING_MODULE_DATA...
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "tween", ease: "steps(4, end)", duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full h-full"
                  >
                    {filteredSkills.map((skill) => (
                      <div 
                        key={skill.name} 
                        className="p-4 border-2 border-zinc-950 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.02)] flex flex-col justify-between gap-3 group hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                      >
                        <div className="flex items-center justify-between font-mono text-xs font-black tracking-wide uppercase text-zinc-950 dark:text-zinc-50">
                          <span className="flex items-center gap-2">
                            <i className={`${skill.icon} text-sm text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform`}></i>
                            {skill.name}
                          </span>
                          <span className={`px-1.5 py-0.5 border text-[9px] font-bold ${getTierBadgeStyle(skill.tier)}`}>
                            {skill.tier}
                          </span>
                        </div>

                        <div className="space-y-1.5 font-mono">
                          <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-800 p-[1px] relative">
                            <div 
                              className={`h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-700 ease-out ${skill.width}`}
                            />
                          </div>
                          <div className="flex justify-between items-center text-[9px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                            <span className="flex items-center"><ChevronRight className="w-2.5 h-2.5" /> ready</span>
                            <span>{skill.percent}% PERFORMANCE</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}