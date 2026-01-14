"use client"

import { HeroSection } from "@/components/landing/HeroSection"
import { motion } from "framer-motion"
import React from "react"

const PARTICLE_COUNT = 6

export default function Home() {
  const [mounted, setMounted] = React.useState(false)
  const [particles, setParticles] = React.useState<
    Array<{
      id: number
      x: number
      y: number
      drift: number
      duration: number
      delay: number
    }>
  >([])

  React.useEffect(() => {
    setMounted(true)
    // Generate particle seeds on client only (avoid SSR/CSR mismatch + purity lint)
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        drift: Math.random() * 40 - 20,
        duration: 4 + Math.random() * 3,
        delay: i * 0.8,
      }))
    )
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#0f172a] text-slate-50">
      {/* Animated Blue Radial Glow Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundImage: [
            "radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)",
            "radial-gradient(circle 700px at 50% 50%, rgba(59,130,246,0.4), transparent)",
            "radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle moving light sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0%, rgba(56,189,248,0.10) 35%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle animated grid shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles effect (client-only to avoid hydration mismatch) */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute h-1 w-1 rounded-full bg-sky-400/40"
              initial={{
                x: `${p.x}%`,
                y: `${p.y}%`,
                opacity: 0,
              }}
              animate={{
                y: [null, "-20px", "20px"],
                x: [null, `${p.drift}px`],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <HeroSection />
      </div>
    </div>
  )
}

