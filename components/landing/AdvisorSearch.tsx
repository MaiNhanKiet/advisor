"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Search, User } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"

type AdvisorDoc = {
  name: string
  mssv: string
  advisor: string
  zaloURL: string
}

type ApiErrorBody = {
  error?: string
  message?: string
}

type ApiSuccessBody = {
  found: true
  data: AdvisorDoc
}

export function AdvisorSearch({
  className,
  placeholder = "Nhập MSSV",
}: {
  className?: string
  placeholder?: string
}) {
  const [value, setValue] = React.useState("")
  const [formatError, setFormatError] = React.useState<string | null>(null)
  const [notFoundError, setNotFoundError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [result, setResult] = React.useState<AdvisorDoc | null>(null)
  const mssvRegex = /^[SHQCD][ESA]\d{6}$/

  const trimmed = value.trim().toUpperCase()
  const isFilled = trimmed.length > 0
  const isValid = isFilled && mssvRegex.test(trimmed)
  const hasFormatError = !!formatError

  React.useEffect(() => {
    if (formatError && value) {
      // Bôi đen MSSV để người dùng sửa nhanh
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [formatError, value])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValid) {
      setFormatError("Mã số sinh viên không hợp lệ, bạn vui lòng kiểm tra lại.")
      setNotFoundError(null)
      setResult(null)
      // Bôi đen MSSV khi submit sai
      if (value) {
        requestAnimationFrame(() => {
          inputRef.current?.focus()
          inputRef.current?.select()
        })
      }
      return
    }

    setFormatError(null)
    setNotFoundError(null)
    setResult(null)
    setIsLoading(true)

    try {
      const res = await axios.get<ApiSuccessBody>("/api/advisor", {
        params: { mssv: trimmed },
      })

      setResult(res.data.data)
      return
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        const data = err.response?.data as ApiErrorBody | undefined
        const message = data?.message || data?.error

        if (status === 404) {
          setNotFoundError(message || "Không tìm thấy thông tin Advisor của bạn.")
          return
        }

        if (status === 400) {
          setFormatError(message || "Mã số sinh viên không hợp lệ, bạn vui lòng kiểm tra lại.")
          return
        }
      }

      setNotFoundError("Lỗi máy chủ khi tra cứu Advisor.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={handleSubmit}
    >
      <div className="mb-2 px-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          MSSV <span className="text-slate-200">({Math.min(value.trim().length, 8)} / 8)</span>
        </p>
      </div>

      <div className="group relative">
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.4),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.35),transparent_55%)] opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
        <div
          className={cn(
            "relative flex items-stretch gap-2 rounded-2xl border bg-slate-900/60 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.9)] backdrop-blur-md transition-shadow duration-300 group-hover:shadow-[0_20px_55px_rgba(15,23,42,0.95)]",
            hasFormatError
              ? "border-red-500/70"
              : isValid
                ? "border-sky-400/80"
                : "border-sky-500/60"
          )}
        >
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => {
                // Luôn convert sang IN HOA khi người dùng gõ
                const raw = e.target.value
                const next = raw.toUpperCase().slice(0, 8)
                setValue(next)

                // Khi người dùng bắt đầu gõ lại, reset trạng thái lỗi & kết quả
                if (formatError) setFormatError(null)
                if (notFoundError) setNotFoundError(null)
                if (result) setResult(null)

                const nextTrimmed = next.trim()
                if (!nextTrimmed) {
                  setFormatError(null)
                  return
                }

                // Chỉ báo lỗi khi đủ 8 ký tự nhưng không khớp regex
                if (nextTrimmed.length < 8) {
                  setFormatError(null)
                  return
                }

                if (!mssvRegex.test(nextTrimmed)) {
                  setFormatError("MSSV không hợp lệ, bạn vui lòng kiểm tra lại.")
                } else {
                  setFormatError(null)
                }
              }}
              placeholder={placeholder}
              maxLength={8}
              autoFocus
              className={cn(
                "h-11 rounded-xl bg-slate-900/80 text-slate-50 placeholder:text-slate-400 focus-visible:ring-2 selection:bg-sky-500/40 selection:text-white",
                hasFormatError
                  ? "border-red-500/60 focus-visible:border-red-400 focus-visible:ring-red-500/50"
                  : isValid
                    ? "border-sky-400/80 focus-visible:border-sky-300 focus-visible:ring-sky-400/70"
                    : "border-sky-500/30 focus-visible:border-sky-400 focus-visible:ring-sky-500/50"
              )}
              aria-invalid={hasFormatError}
            />
          </div>

          <Button
            type="submit"
            // Khi đã có kết quả, nút bị disable cho đến khi user nhập MSSV mới
            disabled={!isValid || isLoading || !!result}
            className={cn(
              "h-11 rounded-xl px-6 text-white shadow-[0_10px_25px_rgba(56,189,248,0.55)] transition-all text-sm font-semibold",
              isValid && !isLoading && !result
                ? "bg-linear-to-r from-sky-500 via-cyan-500 to-sky-500 hover:from-sky-400 hover:via-cyan-400 hover:to-sky-400"
                : "bg-slate-600/60 text-slate-300 shadow-none cursor-not-allowed"
            )}
          >
            <Search className="h-4 w-4" />
            <span>{isLoading ? "Đang tìm..." : "Tìm kiếm"}</span>
          </Button>
        </div>
      </div>

      {formatError && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          layout
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="border-red-500/60 bg-[rgba(239,68,68,0.12)] text-red-100 shadow-[0_18px_45px_rgba(127,29,29,0.35)] backdrop-blur-md">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-semibold text-red-100">
                {formatError}
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      )}

      {notFoundError && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          layout
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="border-amber-400/70 bg-[rgba(250,204,21,0.10)] text-amber-100 shadow-[0_18px_45px_rgba(120,53,15,0.35)] backdrop-blur-md">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-semibold text-amber-100">
                {notFoundError}
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      )}

      {result && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          layout
        >
          <Card className="w-full border-sky-500/35 bg-linear-to-b from-slate-950 via-slate-950 to-slate-950 text-slate-50 shadow-[0_24px_70px_rgba(15,23,42,0.95),0_0_50px_rgba(56,189,248,0.12)] backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/25 shadow-[0_0_22px_rgba(56,189,248,0.25)]">
                  <User className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold tracking-tight text-sky-50">
                  {result.name}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pb-5">
              {/* MSSV Field */}
              <div className="space-y-1 text-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400/70">
                  MSSV
                </p>
                <p className="text-base font-semibold text-sky-100">
                  {result.mssv}
                </p>
              </div>

              {/* Advisor Field */}
              <div className="space-y-1 text-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400/70">
                  Advisor
                </p>
                <p className="text-base font-semibold text-sky-50">
                  {result.advisor}
                </p>
              </div>

              {/* Zalo Field */}
              <div className="space-y-1 text-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400/70">
                  Zalo Group
                </p>
                <a
                  href={result.zaloURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-base font-semibold text-sky-100 transition-colors hover:text-sky-200"
                >
                  {result.zaloURL}
                </a>
                <Button
                  asChild
                  size="sm"
                  className="mt-2 h-9 rounded-full bg-linear-to-r from-sky-500 via-cyan-500 to-sky-500 px-4 text-xs font-semibold text-white shadow-[0_0_26px_rgba(56,189,248,0.55)] transition-all hover:from-sky-400 hover:via-cyan-400 hover:to-sky-400 hover:shadow-[0_0_38px_rgba(56,189,248,0.75)]"
                >
                  <a
                    href={result.zaloURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tham gia nhóm Zalo
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </form>
  )
}


