"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EyeIcon } from "@/components/features/auth/EyeIcon"
import { resetPasswordAction } from "@/lib/auth/actions"
import {
  fieldErrorsOf,
  resetPasswordSchema,
} from "@/lib/validations/auth"
import type { FieldErrors } from "@/types"

const PRIMARY = "#181711"

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setFormError(null)

    const parsed = resetPasswordSchema.safeParse({
      token,
      password,
      confirmPassword,
    })
    if (!parsed.success) {
      setErrors(fieldErrorsOf(parsed.error))
      return
    }

    setErrors({})
    setIsSubmitting(true)
    try {
      const result = await resetPasswordAction(parsed.data)
      if (result.ok) {
        router.push("/sign-in?reset=1")
        router.refresh()
        return
      }

      if (result.reason === "invalid") {
        setFormError("This reset link is invalid or has expired.")
      } else if (result.reason === "rate_limit") {
        setFormError("Too many attempts. Please wait a few minutes and try again.")
      } else {
        setFormError("Something went wrong. Please try again.")
      }
    } catch {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    [
      "w-full h-[50px] rounded-[10px] bg-[#F3F3F3] px-4 text-[15px] text-[#666161]",
      "outline-none transition-all duration-150 focus:ring-2",
      hasError
        ? "ring-2 ring-red-500 focus:ring-red-500"
        : "ring-0 focus:ring-[#181711]",
    ].join(" ")

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 sm:gap-5"
    >
      {formError && (
        <p
          role="alert"
          className="rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {formError}
        </p>
      )}

      <div>
        <div
          className={`${inputClass(!!errors.password)} relative flex items-center justify-between pr-10`}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="New password"
            autoComplete="new-password"
            aria-label="New password"
            className="w-full bg-transparent px-4 text-[15px] text-[#666161] outline-none"
          />
          <EyeIcon
            show={showPassword}
            onToggle={() => setShowPassword((value) => !value)}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <div>
        <div
          className={`${inputClass(!!errors.confirmPassword)} relative flex items-center justify-between pr-10`}
        >
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            autoComplete="new-password"
            aria-label="Confirm new password"
            className="w-full bg-transparent px-4 text-[15px] text-[#666161] outline-none"
          />
          <EyeIcon
            show={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((value) => !value)}
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[48px] w-full rounded-xl font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 sm:min-h-[50px]"
        style={{ backgroundColor: PRIMARY }}
      >
        {isSubmitting ? "Updating password…" : "Update password"}
      </button>
    </form>
  )
}
