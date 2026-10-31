"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AvatarMenu } from "@/components/features/auth/AvatarMenu"
import { BrandMark } from "./BrandMark"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Artist", href: "/artist" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
  { label: "Events", href: "/events" },
  { label: "About Us", href: "/about-us" },
]

const MENU_LINKS = [
  ...NAV_LINKS,
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
]

interface SiteHeaderClientProps {
  user: {
    name: string
    email: string
    image?: string | null
  } | null
}

export function SiteHeaderClient({ user }: SiteHeaderClientProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const avatarUser = user
    ? {
        name: user.name,
        email: user.email,
        avatarUrl: user.image ?? undefined,
      }
    : null

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-primary/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <BrandMark className="h-8 w-auto" />
          <span className="text-lg font-semibold tracking-tight text-white">
            Aristofrank World
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "text-sm font-medium text-accent"
                  : "text-sm text-white/70 transition-colors hover:text-white"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {avatarUser ? (
            <AvatarMenu user={avatarUser} />
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold text-primary transition-colors hover:bg-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {avatarUser &&
            <AvatarMenu user={avatarUser} />
          }

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="material-symbols-outlined text-2xl">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                aria-label="Site menu"
                className="absolute right-0 top-full z-50 mt-3 w-52 max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-[#1C1A14] p-2 shadow-2xl"
              >
                <ul className="py-1">
                  {MENU_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        role="menuitem"
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex min-h-11 items-center justify-between px-4 text-sm text-white/80 transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {!avatarUser && (
                  <div className="mt-1 border-t border-white/10 p-2 pt-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center px-2 text-sm text-white/80 transition-colors hover:text-accent"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMenuOpen(false)}
                      className="mt-1 flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-primary"
                    >
                      Create account
                    </Link>
                  </div>
                )}

                <div className="p-2 pt-1">
                  <Link
                    href="/contact-us"
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 w-full items-center justify-center rounded-xl bg-accent text-sm font-semibold text-primary"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
