import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="font-heading text-6xl font-bold text-accent sm:text-7xl">404</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
        get you back to where brands become legends.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:text-base"
      >
        Back to Home
      </Link>
    </main>
  )
}
