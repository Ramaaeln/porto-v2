import { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

import senderIcon from '../../assets/icons/sender.png'

export default function Navbar({ isDark, toggleDark }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuItems = ['Home', 'About', 'Skills', 'Projects', 'Favorites', 'Contact']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 flex justify-center pointer-events-none h-24 transition-all duration-500">
      
      <div className="w-full max-w-5xl flex items-center justify-between bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 px-6 py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] pointer-events-auto transition-colors duration-500">
        
        <div className="flex items-center gap-2 select-none">
          <img 
            src={senderIcon} 
            alt="Rama Icon" 
            className="w-6 h-6 object-contain pointer-events-none drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:drop-shadow-[2px_2px_0px_rgba(255,255,255,0.1)]" 
          />
          <span className="font-mono font-black text-xl tracking-wider text-indigo-500 dark:text-indigo-400">
            R
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="relative text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors duration-300 group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-indigo-500 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="p-2 border-2 border-zinc-950 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            {isDark ? <Sun className="w-4 h-4 stroke-[2.5]" /> : <Moon className="w-4 h-4 stroke-[2.5]" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden border-2 border-zinc-950 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            {isOpen ? <X className="w-4 h-4 stroke-[2.5]" /> : <Menu className="w-4 h-4 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      <div 
        className={`absolute top-20 left-4 right-4 p-5 flex flex-col gap-2 bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] pointer-events-auto md:hidden transition-all duration-200 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsOpen(false)}
            className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 py-3 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border-b-2 border-dashed border-zinc-100 dark:border-zinc-800/40 last:border-none transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}