import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'
import ScrollReveal from './components/ui/ScrollReveal'
import SplashScreen from './components/ui/SplashScreen'

const HeroSection = lazy(() => import('./components/sections/HeroSection'))
const AboutSection = lazy(() => import('./components/sections/AboutSection'))
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'))
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'))
const FavoriteSection = lazy(() => import('./components/sections/FavoritesSection'))
const ContactSection = lazy(() => import('./components/sections/ContactSection'))
const Footer = lazy(() => import('./components/sections/FooterSection'))

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
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
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          
          <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
          
          <Suspense fallback={<div className="h-screen" />}>
            <HeroSection />
          </Suspense>

          <Suspense fallback={
            <div className="w-full flex items-center justify-center py-10 font-mono text-xs text-zinc-400">
              INITIALIZING_COMPONENT...
            </div>
          }>
            <ScrollReveal><AboutSection /></ScrollReveal>
            <ScrollReveal><SkillsSection /></ScrollReveal>
            <ScrollReveal><ProjectsSection /></ScrollReveal>
            <ScrollReveal><FavoriteSection /></ScrollReveal>
            <ScrollReveal><ContactSection /></ScrollReveal>
            <Footer />
          </Suspense>
        </>
      )}
    </div>
  )
}