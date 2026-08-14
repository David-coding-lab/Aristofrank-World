"use client"

import { useEffect, useState } from "react"
import { resendVerificationAction } from "@/lib/auth/actions"

const PRIMARY = "#181711"
const COOLDOWN_SECONDS = 30

type Feedback = { tone: "success" | "error"; text: string }

export function ResendVerification() {
  const [isSending, setIsSending] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  // Tick the resend cooldown down to zero.
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  async function handleResend() {
    setIsSending(true)
    setFeedback(null)

    try {
      const result = await resendVerificationAction()
      if (result.ok) {
        setFeedback({ tone: "success", text: "Sent! Check your inbox again." })
        setCooldown(COOLDOWN_SECONDS)
      } else if (result.reason === "rate_limit") {
        setFeedback({
          tone: "error",
          text: "Please wait a moment before requesting another email.",
        })
        setCooldown(COOLDOWN_SECONDS)
      } else if (result.reason === "expired") {
        setFeedback({
          tone: "error",
          text: "This link request expired. Please sign up again to get a new email.",
        })
      } else {
        setFeedback({ tone: "error", text: "Couldn't resend. Please try again." })
      }
    } catch {
      setFeedback({ tone: "error", text: "Something went wrong. Please try again." })
    } finally {
      setIsSending(false)
    }
  }

  const disabled = isSending || cooldown > 0
  const label = isSending
    ? "Sending…"
    : cooldown > 0
      ? `Resend in ${cooldown}s`
      : "Resend email"

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs text-[#888484] sm:text-sm">
        Didn&apos;t receive the email?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={disabled}
          className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          style={{ color: PRIMARY }}
        >
          {label}
        </button>
      </p>

      {feedback && (
        <p
          role="status"
          className={`text-xs sm:text-sm ${
            feedback.tone === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </div>
  )
}
