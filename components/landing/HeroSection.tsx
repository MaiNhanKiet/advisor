"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AdvisorSearch } from "@/components/landing/AdvisorSearch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="relative mx-auto flex w-full max-w-xl flex-col items-center px-4 pb-12 pt-6 sm:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div className="relative mx-auto mb-4 w-full max-w-sm">
          {/* Glow behind TYPO */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 60%, rgba(59,130,246,0.55), rgba(34,211,238,0.28), transparent 70%)",
            }}
            animate={{ opacity: [0.55, 0.95, 0.55] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />

          <Image
            src="/TYPO.png"
            alt="TÌM KIẾM CỐ VẤN CỦA BẠN"
            width={520}
            height={110}
            className="h-auto w-full object-contain drop-shadow-[0_0_22px_rgba(56,189,248,0.35)] pb-5"
            priority
          />
        </div>

        <Card className="mx-auto w-full max-w-xl border-slate-800/80 bg-slate-950/70 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.95)] backdrop-blur-xl">
          <CardHeader className="pb-1 pt-5">
            <CardTitle className="text-center text-sm font-semibold leading-relaxed text-slate-200 sm:text-base">
              Advisor đóng vai trò đồng hành và kết nối, giúp sinh viên tiếp cận đúng kênh hỗ trợ khi cần thiết
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-1 pb-6">
            <AdvisorSearch />
          </CardContent>
        </Card>
      </motion.div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white">
        SRO FPT University HCMC <span className="align-baseline">©</span>
      </p>
    </section>
  )
}

