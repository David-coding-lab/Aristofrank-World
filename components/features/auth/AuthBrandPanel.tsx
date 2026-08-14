import Link from "next/link"
import Image from "next/image"

/** Brand panel for the sign-in / sign-up split screens. */
export function AuthBrandPanel() {
  return (
    <div
      className="relative h-[38vh] sm:h-[42vh] lg:h-full lg:min-h-screen"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="absolute left-4 top-4 z-10 flex items-center gap-2 sm:left-6 sm:top-6 lg:left-8 lg:top-8"
      >
        <Image src="/favicon.svg" alt="Aristofrank World logo" width={36} height={36} />
        <span className="font-bold text-white text-lg tracking-tight">
          Aristofrank World
        </span>
      </Link>

      {/* Brand message — centers on desktop, crops on mobile */}
      <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center lg:static lg:flex lg:h-full lg:translate-y-0 lg:items-center lg:justify-center">
        <div className="px-6 text-center">
          <p className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Where Brands Become Legends
          </p>
          <p className="mt-3 text-xs text-white/60 sm:text-sm">
            Branding · Visual Identity · Media · Music · Promotions
          </p>
        </div>
      </div>
    </div>
  )
}
