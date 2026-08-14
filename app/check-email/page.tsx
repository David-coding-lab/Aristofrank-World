import type { Metadata } from "next"
import Link from "next/link"
import { ResendVerification } from "./components/ResendVerification"

const PRIMARY = "#181711"

export const metadata: Metadata = {
  title: "Check your email",
  description: "Verify your Aristofrank World account from the link we just emailed you.",
  robots: { index: false, follow: false },
}

export default function CheckEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6">
      <div className="w-full max-w-sm text-center sm:max-w-md">
        <span
          className="material-symbols-outlined mb-4 text-5xl sm:text-6xl"
          style={{ color: PRIMARY }}
          aria-hidden="true"
        >
          mark_email_read
        </span>

        <h1
          className="text-xl font-semibold sm:text-2xl lg:text-3xl"
          style={{ color: PRIMARY }}
        >
          Check your email
        </h1>

        <p className="mt-3 text-sm text-[#555252] sm:text-base">
          We&apos;ve sent a verification link to your inbox. Click the link to
          verify your account, then sign in to continue.
        </p>

        <p className="mt-2 text-xs text-[#888484] sm:text-sm">
          Check your spam folder if it&apos;s not in your inbox.
        </p>

        <ResendVerification />

        <Link
          href="/sign-in"
          className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl px-6 font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] sm:min-h-[50px] sm:w-auto"
          style={{ backgroundColor: PRIMARY }}
        >
          Go to Sign In
        </Link>
      </div>
    </main>
  )
}
