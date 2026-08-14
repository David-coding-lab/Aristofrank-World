"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Artist", href: "/artist" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about-us" },
]

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Artist", href: "/artist" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about-us" },
  { label: "Media", href: "/media" },
  { label: "Event", href: "/event" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
]

/** Triple-bar gold emblem used as the brand mark. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="170"
      height="212"
      viewBox="0 0 170 212"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="32.8816" cy="106" rx="32.8816" ry="106" fill="#F2CC0D" />
      <ellipse cx="84.8011" cy="106" rx="32.8816" ry="106" fill="#F2CC0D" />
      <ellipse cx="136.72" cy="106" rx="32.8816" ry="106" fill="#F2CC0D" />
    </svg>
  )
}

export function SiteHeader() {
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-primary/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark className="h-8 w-auto" />
          <span className="text-lg font-semibold tracking-tight text-white">
            Aristofrank World
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
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

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>

          {menuOpen && (
            <div
              role="menu"
              aria-label="Site menu"
              className="absolute right-0 top-full z-50 mt-3 w-40 max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-[#1C1A14] p-2 shadow-2xl"
            >
              <ul className="py-1">
                {MENU_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      role="menuitem"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[44px] items-center justify-between px-4 text-sm text-white/80 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="p-2 pt-1">
                <Link
                  href="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-xl border border-accent text-sm font-semibold text-accent transition-colors bg-accent text-primary"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
