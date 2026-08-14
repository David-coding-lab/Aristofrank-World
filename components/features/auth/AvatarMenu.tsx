"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar } from "@/components/ui/Avatar"
import { signOutAction } from "@/lib/auth/actions"

interface AvatarMenuProps {
  user: { name: string; email: string; avatarUrl?: string }
}

interface MenuLink {
  label: string
  href: string
  icon: string
}

// Menu destinations — all live under (protected) and are guarded by proxy.ts.
const MENU_LINKS: MenuLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Profile", href: "/profile", icon: "person" },
]

/**
 * Account avatar with a click-to-open dropdown for the signed-in user. Closes on
 * outside click, Escape, or navigation; the final item signs the user out.
 */
export function AvatarMenu({ user }: AvatarMenuProps) {
  const [open, setOpen] = useState(false)
  const [isSigningOut, startSignOut] = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  function handleSignOut() {
    startSignOut(async () => {
      await signOutAction()
      setOpen(false)
      router.push("/")
      router.refresh()
    })
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
        className="flex min-h-11 min-w-11 items-center justify-center rounded-full ring-2 ring-white/30 transition hover:ring-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Avatar name={user.name} src={user.avatarUrl} size={40} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account"
          className="absolute right-0 z-50 mt-3 w-60 max-w-[calc(100vw-2rem)] origin-top-right overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-xl"
        >
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
            <Avatar name={user.name} src={user.avatarUrl} size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--color-dark)]">
                {user.name}
              </p>
              <p className="truncate text-xs text-[var(--color-muted)]">
                {user.email}
              </p>
            </div>
          </div>

          <ul className="py-1">
            {MENU_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  role="menuitem"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-dark)] transition-colors hover:bg-[var(--color-surface)]"
                >
                  <span
                    className="material-symbols-outlined text-[var(--color-muted)]"
                    style={{ fontSize: "20px" }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-[var(--color-border)] py-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex min-h-[44px] w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-error)] transition-colors hover:bg-red-50 disabled:opacity-60"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                logout
              </span>
              {isSigningOut ? "Logging out…" : "Log out"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
