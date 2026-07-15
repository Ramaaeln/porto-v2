import { useState, useEffect } from 'react'
import { FolderGit2, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import 'remixicon/fonts/remixicon.css'

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none pointer-events-none">
      {[1, 2, 3].map((card) => (
        <div 
          key={card} 
          className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] flex flex-col justify-between min-h-[380px]"
        >
          <div>
            <motion.div 
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: card * 0.15 }}
              className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 border-b-4 border-zinc-950 dark:border-zinc-700" 
            />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded-none w-2/3" />
              <div className="space-y-2">
                <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-none w-full" />
                <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-none w-[90%]" />
                <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-none w-[75%]" />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {[1, 2, 3].map((tag) => (
                  <div key={tag} className="h-4 w-10 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" />
                ))}
              </div>
            </div>
          </div>
          <div className="p-5 pt-0">
            <div className="h-6 w-full border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  const [loading, setLoading] = useState(true)

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
      title: 'SAPABUARAN',
      desc: 'A community reporting ecosystem for South Tangerang residents built with a multi-role mobile architecture and real-time Firebase push notifications.',
      tags: ['Flutter', 'React', 'Firebase', 'Supabase'],
      image: '/projects/sapabuaran.png',
      link: 'https://buaran.vercel.app/',
      github: 'https://github.com/Ramaaeln/buaran'
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
      title: 'WAROENG EDUL',
      desc: 'An end-to-end full-stack e-commerce and food ordering system selected as the Best Project at Talentclass Batch 17.',
      tags: ['React', 'Express', 'Node.js'],
      image: '/projects/waroeng.jpeg',
      link: 'https://waroeng-dul.vercel.app/',
      github: 'https://github.com/Ramaaeln/waroeng-dul'
    },
    {
      title: 'SUPLIER DESA',
      desc: 'A commercial B2B supply chain management dashboard equipped with interactive data visualization and sales analytics charts for administrators.',
      tags: ['React', 'TailwindCSS', 'Supabase'],
      image: '/projects/suplier.png',
      link: 'https://suplier-desa.vercel.app/',
      github: null
    }
  ]

  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#fafafa] pt-22 md:pt-22 dark:bg-[#0c0c0e] transition-colors duration-500 p-6 md:p-12 overflow-hidden selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="w-full max-w-5xl z-10 space-y-10">
        
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const hasLinks = project.link || project.github;

              return (
                <div key={index} className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] group hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.15)] transition-all duration-300 flex flex-col justify-between">
                  
                  <div>
                    <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 border-b-4 border-zinc-950 dark:border-zinc-700 overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={`Screenshot ${project.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 font-mono text-[10px] text-zinc-400 uppercase tracking-widest italic select-none">
                        [IMAGE_NOT_FOUND]
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-mono font-bold text-base text-zinc-950 dark:text-zinc-50 uppercase tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed min-h-[64px]">
                        {project.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 border border-indigo-500/20 select-none">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {hasLinks && (
                    <div className="p-5 pt-0">
                      <div className="flex gap-4 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 font-mono text-[10px] font-bold uppercase tracking-wider">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 text-zinc-950 dark:text-zinc-50 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" /> Visit
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 text-zinc-950 dark:text-zinc-50 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                          >
                            <i className="ri-github-fill text-sm"></i> Code
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  )
}