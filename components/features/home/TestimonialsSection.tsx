import Link from "next/link"
import { TestimonialsCarousel } from "./TestimonialsCarousel"

/**
 * "Voices Of Our Partners" — social proof in dark charcoal panels, closed by
 * the final "Forge Your Legacy" conversion CTA.
 */
export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
          Voices Of Our Partners
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
          Testimonials from the brands and artists we have helped transform
          into legends.
        </p>

        <TestimonialsCarousel />

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact-us"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-accent px-8 text-sm font-semibold tracking-wide text-accent transition-colors duration-200 hover:bg-accent hover:text-primary sm:w-auto sm:text-base"
          >
            Forge Your Legacy
          </Link>
        </div>
      </div>
    </section>
  )
}
