import Link from "next/link"
import type { ReactNode } from "react"

interface OutlinedCtaButtonProps {
  href?: string
  children: ReactNode
  className?: string
}

/** Outlined gold CTA button: 230×51px, radius 60, 1px accent border. */
export function OutlinedCtaButton({
  href = "/contact-us",
  children,
  className = "",
}: OutlinedCtaButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[51px] w-[230px] items-center justify-center gap-2.5 rounded-[60px] border border-accent px-[29px] py-[14px] text-sm font-semibold tracking-wide text-accent transition-colors duration-200 hover:bg-accent hover:text-primary ${className}`}
    >
      {children}
    </Link>
  )
}
