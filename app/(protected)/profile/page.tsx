import Link from "next/link"
import { redirect } from "next/navigation"
import { SiteFooter } from "@/components/features/layout/SiteFooter"
import { SiteHeader } from "@/components/features/layout/SiteHeader"
import { Avatar } from "@/components/ui/Avatar"
import { getCurrentUser } from "@/lib/auth/session"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Profile — Aristofrank World",
  robots: { index: false, follow: false },
}

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in?redirect=/profile")
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#201F18] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar
              name={user.name}
              src={user.image ?? undefined}
              size={72}
            />
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold sm:text-3xl">
                {user.name}
              </h1>
              <p className="mt-1 truncate text-sm text-white/60">
                {user.email}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-accent">
                {user.emailVerification ? "Email verified" : "Email not verified"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-primary transition-colors hover:bg-white"
            >
              Go to dashboard
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
            >
              Back to site
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
