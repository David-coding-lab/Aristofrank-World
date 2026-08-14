"use client"

import { useRouter } from "next/navigation"

interface BackButtonProps {
  variant?: "text" | "icon"
}

export default function BackButton({ variant = "text" }: BackButtonProps) {
  const router = useRouter()

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer rounded-full bg-white/80 backdrop-blur-sm text-dark shadow-sm transition-colors hover:bg-white"
      >
        <span className="material-symbols-outlined text-xl">chevron_backward</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center cursor-pointer gap-1 text-sm font-medium text-dark hover:text-primary transition-colors"
    >
      <span className="material-symbols-outlined text-lg">arrow_back</span>
      Back
    </button>
  )
}
