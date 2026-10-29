import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create account — Aristofrank World",
  robots: { index: false, follow: false },
}

export default function SignUpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
