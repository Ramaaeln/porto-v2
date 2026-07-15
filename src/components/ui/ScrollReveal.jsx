import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function ScrollReveal({ children }) {
  const { ref, inView } = useInView({
    threshold: 0.05,
    rootMargin: "-20px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          transition: {
            type: "spring",
            stiffness: 70,
            damping: 14,
            mass: 0.8,
            delayChildren: 0.05,
            staggerChildren: 0.03
          }
        },
        hidden: {
          opacity: 0,
          scale: 0.97,
          y: 24,
          clipPath: "inset(8% 0% 8% 0%)",
          transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.3
          }
        }
      }}
      className="w-full will-change-[transform,opacity,clip-path]"
      style={{
        imageRendering: 'pixelated',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  )
}