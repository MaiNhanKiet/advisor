"use client"

import { motion } from "framer-motion"

function CircuitOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
    >
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(34,247,255,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-grid [background-size:48px_48px] opacity-25" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(34,247,255,0.10),transparent_45%,rgba(59,130,246,0.10))] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_15%_25%,rgba(59,130,246,0.16),transparent_60%),radial-gradient(420px_circle_at_85%_35%,rgba(34,247,255,0.14),transparent_60%)]" />
    </div>
  )
}

function FloatingCube({
  className,
  delay = 0,
  duration = 10,
}: {
  className: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.25, 0.6, 0.25], y: [0, -10, 0] }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function FuturisticBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <CircuitOverlay />

      <motion.div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingCube className="absolute left-[8%] top-[22%] h-16 w-16 rotate-12 rounded-xl border border-neon-cyan/35 bg-white/5 shadow-neon backdrop-blur-md" />
      <FloatingCube
        className="absolute right-[10%] top-[18%] h-12 w-12 -rotate-6 rounded-lg border border-neon-cyan/30 bg-white/5 shadow-neon backdrop-blur-md"
        delay={0.6}
        duration={12}
      />
      <FloatingCube
        className="absolute right-[18%] bottom-[20%] h-20 w-20 rotate-3 rounded-2xl border border-electric-blue/30 bg-white/5 shadow-neon backdrop-blur-md"
        delay={1.1}
        duration={14}
      />

      <motion.div
        className="absolute left-[-20%] top-[55%] h-40 w-[520px] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(34,247,255,0.25),transparent)] blur-sm"
        animate={{ x: ["0%", "80%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-[-30%] top-[35%] h-32 w-[620px] -rotate-6 bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.20),transparent)] blur-sm"
        animate={{ x: ["0%", "-85%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}


