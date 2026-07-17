import { useState, useEffect } from 'react'
import { FolderGit2, ExternalLink, Terminal, ChevronRight, FileCode, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import 'remixicon/fonts/remixicon.css'

function ProjectsSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] min-h-[450px] flex flex-col md:flex-row divide-y-4 md:divide-y-0 md:divide-x-4 divide-zinc-950 dark:divide-zinc-800 select-none pointer-events-none">
      <div className="w-full md:w-2/5 p-4 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 w-full" />
        ))}
      </div>
      <motion.div 
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-full md:w-3/5 p-6 space-y-4"
      >
        <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950" />
        <div className="h-5 bg-zinc-300 dark:bg-zinc-800 w-1/3" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-full" />
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const [loading, setLoading] = useState(true)
  const [selectedIdx, setSelectedIdx] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  const projects = [
    {
      title: 'TAX CENTER UNPAM',
      desc: 'A robust examination and certification system featuring an advanced anti-cheating mechanism driven by real-time window and activity listeners.',
      tags: ['React', 'TailwindCSS', 'Express', 'Supabase'],
      image: '/projects/TAXCENTER.png',
      link: 'https://taxcunpam.vercel.app/',
      github: 'https://github.com/Ramaaeln/TAXCUNPAM'
    },
    {
      title: 'SUPLIER DESA',
      desc: 'A commercial B2B supply chain management dashboard equipped with interactive data visualization and sales analytics charts for administrators.',
      tags: ['React', 'TailwindCSS', 'Supabase'],
      image: '/projects/suplier.png',
      link: 'https://suplier-desa.vercel.app/',
      github: null
    },
    {
      title: 'FANNIA ENTERTAINMENT',
      desc: 'A modern corporate web application integrated with secure Google OAuth and an automated conversational live AI chatbot workflow.',
      tags: ['React', 'Supabase', 'OAuth Google'],
      image: '/projects/fannia.png',
      link: 'https://fanniaentertaiment.vercel.app/',
      github: 'https://github.com/Ramaaeln/fannia-entertaiment'
    },
    {
      title: 'SAPABUARAN',
      desc: 'A community reporting ecosystem for South Tangerang residents built with a multi-role mobile architecture and real-time Firebase push notifications.',
      tags: ['Flutter', 'React', 'Firebase', 'Supabase'],
      image: '/projects/sapabuaran.png',
      link: 'https://buaran.vercel.app/',
      github: 'https://github.com/Ramaaeln/buaran'
    },
    {
      title: 'WAROENG EDUL',
      desc: 'An end-to-end full-stack e-commerce and food ordering system selected as the Best Project at Talentclass Batch 17.',
      tags: ['React', 'Express', 'Node.js'],
      image: '/projects/waroeng.jpeg',
      link: 'https://waroeng-dul.vercel.app/',
      github: 'https://github.com/Ramaaeln/waroeng-dul'
    }
    
  ]

  const activeProject = projects[selectedIdx]

  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] pt-22 md:pt-22 dark:bg-[#0c0c0e] transition-colors duration-500 p-4 sm:p-6 md:p-12 overflow-hidden selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="w-full max-w-5xl z-10 space-y-8">
        
        <div className="flex flex-col items-center text-center space-y-3 select-none">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 border border-dashed border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <FolderGit2 className="w-3.5 h-3.5" />
            03 . Selected Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-zinc-950 dark:text-zinc-50">
            Archive.exe
          </h2>
        </div>

        {loading ? (
          <ProjectsSkeleton />
        ) : (
          <div className="w-full bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] flex flex-col">
            
            <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-2 flex items-center justify-between border-b-4 border-zinc-950 select-none">
              <div className="flex items-center gap-2 text-white">
                <Monitor className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">FILE_EXPLORER.SYS // ROOT_DIRECTORIES</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-rose-500 border border-black/20 rounded-none"></span>
                <span className="w-2.5 h-2.5 bg-amber-500 border border-black/20 rounded-none"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 border border-black/20 rounded-none"></span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row divide-y-4 md:divide-y-0 md:divide-x-4 divide-zinc-950 dark:divide-zinc-800 min-h-[480px]">
              
              <div className="w-full md:w-2/5 p-4 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-2 font-mono overflow-y-auto">
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider pb-2 px-2 border-b border-dashed border-zinc-200 dark:border-zinc-800">
                  /VOLUME/PROJECTS_ARCHIVE
                </div>
                {projects.map((project, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full flex items-center justify-between p-2.5 border-2 text-left transition-all rounded-none cursor-pointer text-xs font-bold uppercase tracking-wide
                      ${selectedIdx === idx
                        ? 'bg-indigo-500 text-white border-zinc-950 dark:border-indigo-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                      }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden truncate">
                      <FileCode className={`w-4 h-4 flex-shrink-0 ${selectedIdx === idx ? 'text-white' : 'text-indigo-500'}`} />
                      <span className="truncate">{project.title}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${selectedIdx === idx ? 'translate-x-0.5' : 'opacity-30'}`} />
                  </button>
                ))}
              </div>

              <div className="w-full md:w-3/5 p-5 sm:p-6 flex flex-col justify-between font-mono">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIdx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: "tween", ease: "steps(4, end)", duration: 0.2 }}
                    className="space-y-4 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-950 dark:border-zinc-700 overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
                        <img 
                          src={activeProject.image} 
                          alt={activeProject.title}
                          className="w-full h-full object-cover"
                          style={{ imageRendering: 'pixelated' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-400 uppercase tracking-widest italic select-none">
                          [IMAGE_NOT_FOUND]
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-zinc-50 uppercase tracking-tight flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-500" /> {activeProject.title}
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {activeProject.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeProject.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 border border-indigo-500/20 select-none">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {(activeProject.link || activeProject.github) && (
                      <div className="flex gap-4 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-wider mt-6">
                        {activeProject.link && (
                          <a 
                            href={activeProject.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white border-2 border-zinc-950 dark:border-indigo-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-indigo-700"
                          >
                            <ExternalLink className="w-3 h-3" /> Visit Site
                          </a>
                        )}
                        {activeProject.github && (
                          <a 
                            href={activeProject.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-2 border-zinc-950 dark:border-zinc-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700"
                          >
                            <i className="ri-github-fill text-sm"></i> Source Code
                          </a>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  )
}