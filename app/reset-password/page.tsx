import type { Metadata } from "next"
import Link from "next/link"
import { AuthBrandPanel } from "@/components/features/auth/AuthBrandPanel"
import { ResetPasswordForm } from "@/components/features/auth/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset password — Aristofrank World",
  robots: { index: false, follow: false },
}

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const token = firstParam(params.token)
  const verified = firstParam(params.verified) === "1"

  return (
    <div className="min-h-screen bg-white lg:grid lg:min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="flex flex-col items-center justify-center px-4 pb-12 pt-36 sm:px-6 sm:pt-28 lg:px-8 lg:py-12">
        <div className="w-full max-w-sm sm:max-w-md">
          <h1 className="mb-3 text-center text-xl font-semibold text-[#181711] sm:text-2xl lg:text-left lg:text-3xl">
            Choose a new password
          </h1>
          <p className="mb-6 text-center text-sm leading-relaxed text-[#666161] lg:text-left">
            Use at least 8 characters. Resetting your password signs you out of
            all other devices.
          </p>

          {verified && (
            <p
              role="status"
              className="mb-4 rounded-[10px] bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              Email verified. Choose a password to finish securing your account.
            </p>
          )}

          {token ? (
            <ResetPasswordForm token={token} />
          ) : (
            <div
              role="alert"
              className="rounded-[10px] bg-red-50 px-4 py-4 text-sm text-red-600"
            >
              This reset link is missing or invalid. Request a new one from the
              sign-in page.
            </div>
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
