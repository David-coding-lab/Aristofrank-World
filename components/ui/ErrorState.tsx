"use client"

interface ErrorStateProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
}

export function ErrorState({
  error,
  reset,
  title = "Something went wrong",
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <span className="material-symbols-outlined text-5xl text-error">error</span>
      <h2 className="mt-4 text-2xl font-bold text-dark">{title}</h2>
      <p className="mt-2 max-w-md text-dark/60">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  )
}
