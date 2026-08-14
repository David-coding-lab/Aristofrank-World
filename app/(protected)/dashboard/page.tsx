import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/session"

// Per-user data — always fresh, never indexed.
export const dynamic = "force-dynamic"

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
}

/**
 * Placeholder protected route. `proxy.ts` already handles the redirect for
 * unauthenticated visitors; the explicit check covers edge cases (e.g. an
 * expired session that proxy.ts can't see) so this page never renders empty.
 */
export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in?redirect=/dashboard")
  }

  return (
    <main className="mx-auto w-full max-w-screen-md px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted sm:text-base">
        Welcome back, {user.name}. Protected routes go here.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 sm:p-6">
          <h2 className="font-heading text-lg font-semibold sm:text-xl">
            Placeholder Panel
          </h2>
          <p className="mt-1 text-sm text-muted">
            Scaffold content — replace with real dashboard widgets.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 sm:p-6">
          <h2 className="font-heading text-lg font-semibold sm:text-xl">
            Account
          </h2>
          <p className="mt-1 text-sm text-muted">
            Signed in as {user.email}.
          </p>
        </div>
      </div>
    </main>
  )
}
