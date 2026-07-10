import { useState, useEffect } from 'react'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => setIsDark(e.matches)
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="h-full w-full overflow-hidden relative select-none bg-[#fafafa] dark:bg-[#0a0a0c] transition-colors duration-500">
      <CustomCursor />
      
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      
      <HeroSection />
      <AboutSection/>
    </div>
  )
}