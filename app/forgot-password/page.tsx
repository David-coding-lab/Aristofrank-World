"use client"

import { useState } from "react"
import Link from "next/link"
import { AuthBrandPanel } from "@/components/features/auth/AuthBrandPanel"
import { requestPasswordResetAction } from "@/lib/auth/actions"
import { emailSchema } from "@/lib/validations/auth"

const PRIMARY = "#181711"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    const parsed = emailSchema.safeParse(email)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email")
      return
    }

    setIsSubmitting(true)
    try {
      await requestPasswordResetAction(parsed.data)
      setSent(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white lg:grid lg:min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="flex flex-col items-center justify-center px-4 pb-12 pt-36 sm:px-6 sm:pt-28 lg:px-8 lg:py-12">
        <div className="w-full max-w-sm sm:max-w-md">
          <h1
            className="mb-3 text-center text-xl font-semibold sm:text-2xl lg:text-left lg:text-3xl"
            style={{ color: PRIMARY }}
          >
            Forgot your password?
          </h1>
          <p className="mb-6 text-center text-sm leading-relaxed text-[#666161] lg:text-left">
            Enter the email on your account and we&apos;ll send a link to choose
            a new password.
          </p>

          {sent ? (
            <div className="rounded-[10px] bg-green-50 px-4 py-4 text-sm text-green-700">
              If an account exists for that email, a reset link has been sent.
              Check your inbox and spam folder.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4 sm:gap-5"
            >
              {error && (
                <p
                  role="alert"
                  className="rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                aria-label="Email"
                className="h-[50px] w-full rounded-[10px] bg-[#F3F3F3] px-4 text-[15px] text-[#666161] outline-none ring-0 transition-all duration-150 focus:ring-2 focus:ring-[#181711]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[48px] w-full rounded-xl font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 sm:min-h-[50px]"
                style={{ backgroundColor: PRIMARY }}
              >
                {isSubmitting ? "Sending…" : "Send reset link"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-[#555252] lg:text-left">
            <Link href="/sign-in" className="font-semibold hover:underline">
              Back to log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
