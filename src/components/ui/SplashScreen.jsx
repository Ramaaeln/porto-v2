import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal } from "lucide-react"

export default function SplashScreen({ finishLoading }) {
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

  const bootLogs = [
    "LOADING RAMA.EXE PROTOCOL...",
    "ESTABLISHING SUPABASE CONNECTIONS...",
    "MOUNTING REACT ARCHITECTURE...",
    "RETRIEVING SELECTED_WORK.LOG...",
    "SYSTEM READY. INITIATING INTERFACE..."
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(finishLoading, 400)
          return 100
        }
        return prev + 4
      })
    }, 60)

    return () => clearInterval(timer)
  }, [finishLoading])

  useEffect(() => {
    if (progress > statusIndex * 22 && statusIndex < bootLogs.length - 1) {
      setStatusIndex((prev) => prev + 1)
    }
  }, [progress, statusIndex])

  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ 
        clipPath: "inset(50% 0% 50% 0%)",
        opacity: 0,
        transition: { 
          type: "tween", 
          ease: "steps(6, end)", 
          duration: 0.4 
        } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0c] p-6 font-mono select-none"
      style={{ imageRendering: "pixelated" }}
    >
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] flex flex-col">
        
        <div className="bg-zinc-950 dark:bg-zinc-800 px-4 py-2.5 flex items-center gap-2 border-b-4 border-zinc-950">
          <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-200">
            BOOT_SEQUENCE.SYS
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div className="min-h-[48px] text-[10px] sm:text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wide space-y-1">
            {bootLogs.slice(0, statusIndex + 1).map((log, i) => (
              <div key={i} className={i === statusIndex ? "text-indigo-600 dark:text-indigo-400" : ""}>
                &gt; {log}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="w-full h-6 bg-zinc-100 dark:bg-zinc-950 border-4 border-zinc-950 dark:border-zinc-800 p-[2px] relative">
              <div 
                className="h-full bg-indigo-600 transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-black text-zinc-950 dark:text-zinc-50">
              <span>STATUS: IN_PROGRESS</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}