"use client"

import { useRef } from "react"
import type { TestimonialSummary } from "@/lib/content/types"

interface TestimonialsCarouselProps {
  testimonials: TestimonialSummary[]
}

function Star() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="#F2CC0D"
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

export function TestimonialsCarousel({
  testimonials = [],
}: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByCards(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const firstCard = track.querySelector<HTMLElement>("[data-card]")
    const step = firstCard ? firstCard.offsetWidth + 24 : 420
    track.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  if (testimonials.length === 0) return null

  return (
    <div className="mt-12">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scrollbar-hide pb-2"
      >
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            data-card
            className="w-[85%] shrink-0 snap-start rounded-2xl bg-panel p-6 sm:w-[420px] sm:p-8"
          >
            <div
              className="flex gap-1"
              role="img"
              aria-label={`Rated ${testimonial.rating} out of 5 stars`}
            >
              {Array.from({ length: testimonial.rating }, (_, i) => (
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
