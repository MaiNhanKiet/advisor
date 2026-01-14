"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"

export type AdvisorCardData = {
  name: string
  department: string
  title?: string
  avatarUrl?: string
}

export function AdvisorCard({ advisor }: { advisor: AdvisorCardData }) {
  const initials = advisor.name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0]?.toUpperCase())
    .join("")

  return (
    <motion.div
      whileHover={{
        y: -2,
        filter: "brightness(1.06)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Card className="relative overflow-hidden border-neon-cyan/25 bg-white/5 shadow-glass backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_10%_10%,rgba(34,247,255,0.18),transparent_55%)] opacity-70" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-neon-cyan/20" />

        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12 ring-1 ring-neon-cyan/35">
            <AvatarImage src={advisor.avatarUrl ?? ""} alt={advisor.name} />
            <AvatarFallback className="bg-white/10 text-soft-white">
              {initials || "AD"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <CardTitle className="truncate text-soft-white">
              {advisor.name}
            </CardTitle>
            <CardDescription className="truncate text-soft-white/70">
              {advisor.title ? `${advisor.title} • ` : ""}
              {advisor.department}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between gap-3 text-xs text-soft-white/70">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_12px_rgba(34,247,255,0.8)]" />
              Đang sẵn sàng hỗ trợ
            </span>
            <span className="rounded-full border border-neon-cyan/20 bg-white/5 px-2 py-1">
              FPTU Advisor
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


