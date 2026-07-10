import { useState, useEffect } from 'react'
import Cursor1 from '../../assets/icons/cursor1.png'
import Cursor2 from '../../assets/icons/cursor2.png'
import Cursor3 from '../../assets/icons/cursor3.png'

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [cursorIndex, setCursorIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(true)

  const cursors = [Cursor1, Cursor2, Cursor3]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    setIsMobile(mediaQuery.matches)

    const handleDeviceChange = (e) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handleDeviceChange)

    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleDeviceChange)
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const interval = setInterval(() => {
      setCursorIndex((prev) => (prev + 1) % cursors.length)
    } , 800)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
      mediaQuery.removeEventListener('change', handleDeviceChange)
    }
  }, [])

  if (isMobile) return null

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
      }}
    >
      <img
        src={cursors[cursorIndex]}
        alt="Custom Cursor"
        className="w-12 h-12 object-contain select-none pointer-events-none"
      />
    </div>
  )
}