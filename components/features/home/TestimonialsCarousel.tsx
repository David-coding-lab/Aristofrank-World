"use client"

import { useRef } from "react"

const TESTIMONIALS = [
  {
    quote:
      "Aristofrank World didn't just rebrand us — they gave our story a heartbeat. Our audience finally sees us the way we always saw ourselves.",
    name: "Tunde Adebayo",
    role: "Founder, Adebayo Group",
  },
  {
    quote:
      "Working with their team felt like joining a movement. We went from a local name to a nationally recognized label in under a year.",
    name: "Ngozi Eze",
    role: "CEO, Nova Records",
  },
  {
    quote:
      "They treated our campaign like a film production. The attention to craft is on another level entirely.",
    name: "Kofi Mensah",
    role: "Creative Director, Kobe & Co",
  },
  {
    quote:
      "From our visual identity to our stage presence, everything is now unmistakably ours. Legends, indeed.",
    name: "Amara Osei",
    role: "Recording Artist",
  },
]

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#F2CC0D" aria-hidden="true">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

export function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByCards(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const firstCard = track.querySelector<HTMLElement>("[data-card]")
    const step = firstCard ? firstCard.offsetWidth + 24 : 420
    track.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  return (
    <div className="mt-12">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scrollbar-hide pb-2"
      >
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            data-card
            className="w-[85%] shrink-0 snap-start rounded-2xl bg-panel p-6 sm:w-[420px] sm:p-8"
          >
            <div
              className="flex gap-1"
              role="img"
              aria-label="Rated 5 out of 5 stars"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} />
              ))}
            </div>

            <blockquote className="mt-5 text-sm italic leading-relaxed text-white/80 sm:text-base">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <hr className="my-6 border-white/10" />

            <figcaption>
              <p className="font-heading text-base font-semibold sm:text-lg">
                {testimonial.name}
              </p>
              <p className="mt-0.5 text-xs text-white/50 sm:text-sm">
                {testimonial.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Previous testimonials"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_left
          </span>
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Next testimonials"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  )
}
