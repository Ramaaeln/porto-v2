import { useEffect, useRef } from 'react'
import HeroBaseBlank from '../../assets/icons/heromako.png'

const CustomPixelPupil = () => (
  <svg
    viewBox="0 0 6 6"
    className="w-full h-full"
    style={{ imageRendering: 'pixelated' }}
  >
    <path d="M2,0 h2 v1 h-2 z M1,1 h4 v1 h-4 z M0,2 h6 v2 h-6 z M1,4 h4 v1 h-4 z M2,5 h2 v1 h-2 z" fill="#1a1c2c" />
    <rect x="3" y="1" width="1" height="1" fill="#ffffff" />
  </svg>
)

export default function HeroMako() {
  const leftEye = useRef(null)
  const rightEye = useRef(null)

  const eyesState = useRef({
    pointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    isLeftWindow: false,
    left: { current: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
    right: { current: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, target: { x: 0, y: 0 } }
  })

  const MAX_RADIUS = 2.5
  const SPRING = 0.08
  const DAMPING = 0.82
  const DEAD_ZONE = 25

  const calculate = (ref) => {
    if (!ref.current || eyesState.current.isLeftWindow) return { x: 0, y: 0 }

    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const dx = eyesState.current.pointer.x - cx
    const dy = eyesState.current.pointer.y - cy

    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < DEAD_ZONE) {
      return { x: 0, y: 0 }
    }

    const angle = Math.atan2(dy, dx)
    const strength = Math.min(distance / 300, 1)

    return {
      x: Math.cos(angle) * MAX_RADIUS * strength,
      y: Math.sin(angle) * MAX_RADIUS * strength
    }
  }

  useEffect(() => {
    const move = (e) => {
      eyesState.current.pointer.x = e.clientX
      eyesState.current.pointer.y = e.clientY
      eyesState.current.isLeftWindow = false
    }

    const leave = () => {
      eyesState.current.isLeftWindow = true
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)

    let frame

    const animate = () => {
      const state = eyesState.current
      
      state.left.target = calculate(leftEye)
      state.right.target = calculate(rightEye)

      const time = performance.now() * 0.0015

      const update = (eye, element, offset) => {
        if (!element.current) return

        eye.velocity.x += (eye.target.x - eye.current.x) * SPRING
        eye.velocity.y += (eye.target.y - eye.current.y) * SPRING

        eye.velocity.x *= DAMPING
        eye.velocity.y *= DAMPING

        eye.current.x += eye.velocity.x
        eye.current.y += eye.velocity.y

        const idleX = Math.sin(time + offset) * 0.06
        const idleY = Math.cos(time * 0.8 + offset) * 0.04

        const finalX = eye.current.x + idleX
        const finalY = eye.current.y + idleY

        element.current.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`
      }

      update(state.left, leftEye, 0)
      update(state.right, rightEye, 0.4)

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div
      className="relative w-96 h-96 select-none pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    >
      <img
        src={HeroBaseBlank}
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
      />

      <div
        ref={leftEye}
        className="absolute top-[55.5%] left-[36.6%] w-4 h-4 will-change-transform"
      >
        <CustomPixelPupil />
      </div>

      <div
        ref={rightEye}
        className="absolute top-[55.5%] left-[54.8%] w-4 h-4 will-change-transform"
      >
        <CustomPixelPupil />
      </div>
    </div>
  )
}