import { useState, useEffect } from 'react'
import { Code, Cpu, Smartphone, Wrench, Terminal } from 'lucide-react'
import { motion } from 'framer-motion'

function SkillsSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-8 select-none pointer-events-none">
      {[1, 2].map((box) => (
        <div 
          key={box}
          className="bg-white dark:bg-zinc-900 border-2 sm:border-4 border-zinc-950 dark:border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
        >
          <div className="bg-zinc-950 dark:bg-zinc-800 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between border-b-2 sm:border-b-4 border-zinc-950">
            <div className="h-3.5 bg-zinc-700 rounded-none w-32" />
          </div>

          <motion.div 
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: box * 0.15 }}
            className="p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6"
          >
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex md:flex-col justify-between items-center md:items-stretch gap-2 p-2.5 md:p-0 border-2 md:border-0 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 md:bg-transparent">
                <div className="flex items-center justify-between w-full">
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-800 w-24 rounded-none" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-14 border border-zinc-300 dark:border-zinc-700" />
                </div>
                <div className="hidden md:block w-full h-4 bg-zinc-100 dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-800 p-[1px]" />
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 850)
    return () => clearTimeout(timer)
  }, [])

  const skillCategories = [
    { id: 'all', name: '00 . ALL' },
    { id: 'frontend', name: '01 . FRONTEND' },
    { id: 'backend', name: '02 . BACKEND' },
    { id: 'mobile', name: '03 . MOBILE' },
    { id: 'tools', name: '04 . UTILS' }
  ]

  const skillsData = [
    { name: 'React.js', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'frontend', icon: 'ri-reactjs-line' },
    { name: 'Next.js', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'frontend', icon: 'ri-nextjs-line' },
    { name: 'Tailwind CSS', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'frontend', icon: 'ri-tailwindcss-line' },
    { name: 'JavaScript / TS', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'frontend', icon: 'ri-javascript-line' },
    
    { name: 'Node.js', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'backend', icon: 'ri-node-tree' },
    { name: 'Express.js', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'backend', icon: 'ri-server-line' },
    { name: 'Supabase / Firebase', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'backend', icon: 'ri-database-2-line' },
    { name: 'RESTful API', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'backend', icon: 'ri-code-s-slash-line' },
    
    { name: 'Flutter', tier: 'FAMILIAR', width: 'w-[50%]', category: 'mobile', icon: 'ri-flutter-line' },
    { name: 'Kotlin', tier: 'FAMILIAR', width: 'w-[50%]', category: 'mobile', icon: 'ri-android-line' },
    
    { name: 'Git / GitHub', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'tools', icon: 'ri-github-line' },
    { name: 'Vite / Webpack', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'tools', icon: 'ri-command-line' },
    { name: 'Postman', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'tools', icon: 'ri-mail-send-line' },
    { name: 'AI Integration', tier: 'INTERMEDIATE', width: 'w-[80%]', category: 'tools', icon: 'ri-brain-line' },
    { name: 'Figma', tier: 'FAMILIAR', width: 'w-[50%]', category: 'tools', icon: 'ri-figma-line' }
  ]

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory)

  const getCategoryHeader = (cat) => {
    switch(cat) {
      case 'frontend': return { title: 'Front-End Engine', icon: <Code className="w-4 h-4 text-rose-500" /> }
      case 'backend': return { title: 'Back-End Runtime', icon: <Cpu className="w-4 h-4 text-indigo-500" /> }
      case 'mobile': return { title: 'Mobile Frameworks', icon: <Smartphone className="w-4 h-4 text-emerald-500" /> }
      default: return { title: 'System Utilities', icon: <Wrench className="w-4 h-4 text-amber-500" /> }
    }
  }

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const getTierBadgeStyle = (tier) => {
    switch(tier) {
      case 'INTERMEDIATE': return 'text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
      case 'FAMILIAR': return 'text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'
      default: return 'text-zinc-500 dark:text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
    }
  }

  return (
    <section id="skills" className="pt-22 md:pt-26 relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0c0c0e] transition-colors duration-500 p-4 sm:p-6 md:p-12 overflow-hidden selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="w-full max-w-5xl z-10 space-y-6 sm:space-y-10">
        
        <div className="flex flex-col items-center text-center space-y-2 select-none">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            02 . Capabilities
          </div>
          <h2 className="text-2xl sm:text-5xl font-black font-mono uppercase tracking-tight text-zinc-950 dark:text-zinc-50">
            Skills Tree
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 max-w-xl mx-auto select-none">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`font-mono text-[10px] sm:text-xs px-2.5 py-1.5 sm:px-4 sm:py-2 border-2 border-zinc-950 dark:border-zinc-800 rounded-none transform transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer
                ${activeCategory === category.id 
                  ? 'bg-indigo-500 text-white border-indigo-600 shadow-none translate-x-0.5 translate-y-0.5' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:-translate-y-0.5 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <SkillsSkeleton />
        ) : (
          <div className="space-y-4 sm:space-y-8">
            {Object.keys(groupedSkills).map((categoryKey) => {
              const { title, icon } = getCategoryHeader(categoryKey)
              return (
                <div 
                  key={categoryKey}
                  className="bg-white dark:bg-zinc-900 border-2 sm:border-4 border-zinc-950 dark:border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all"
                >
                  <div className="bg-zinc-950 dark:bg-zinc-800 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 border-b-2 sm:border-b-4 border-zinc-950 select-none">
                    {icon}
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">
                      {title}.sh
                    </span>
                  </div>

                  <div className="p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    {groupedSkills[categoryKey].map((skill) => (
                      <div key={skill.name} className="flex md:flex-col justify-between items-center md:items-stretch gap-2 p-2.5 md:p-0 border-2 md:border-0 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 md:bg-transparent dark:bg-zinc-950/20 md:dark:bg-transparent group">
                        
                        <div className="flex items-center justify-between font-mono text-xs font-bold tracking-wide uppercase text-zinc-700 dark:text-zinc-300 w-full">
                          <span className="flex items-center gap-2">
                            <i className={`${skill.icon} text-sm text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform`}></i>
                            {skill.name}
                          </span>
                          <span className={`font-bold px-1.5 py-0.5 border text-[9px] ${getTierBadgeStyle(skill.tier)}`}>
                            {skill.tier}
                          </span>
                        </div>

                        <div className="hidden md:block w-full h-4 bg-zinc-100 dark:bg-zinc-950 border-2 border-zinc-950 dark:border-zinc-800 p-[1px] rounded-none relative">
                          <div 
                            className={`h-full bg-indigo-500 dark:bg-indigo-500 transition-all duration-1000 ease-out ${skill.width}`}
                          />
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}