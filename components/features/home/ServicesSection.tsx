import Link from "next/link"
import Image from "next/image"
import { OutlinedCtaButton } from "@/components/ui/OutlinedCtaButton"

const SERVICES = [
  {
    title: "Brand Strategy",
    image: "/music.png",
    description:
      "Building captivating brand narratives through defined message, positioning, and voice.",
  },
  {
    title: "Visual Identity",
    image: "/paint.png",
    description:
      "Logos, art direction, and design systems that make brands instantly recognizable and unforgettable.",
  },
  {
    title: "Media Production",
    image: "/video.png",
    description:
      "Film, photography, and audio production executed with cinematic precision and editorial craft.",
  },
]

/**
 * "Crafting Legendary Brands"
 */
export function ServicesSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
          Crafting Legendary Brands
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
          A glimpse into the service we employ to elevate your brand.
        </p>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex h-[365px] w-full max-w-[340px] flex-col items-center justify-center gap-[15px] rounded-[4px] bg-[#201F18] p-6 text-center"
            >
              <Image
                src={service.image}
                alt={`${service.title} — Aristofrank World`}
                width={88}
                height={86}
                sizes="88px"
                className="aspect-[44/43] h-[86px] w-[88px] object-cover"
              />

              <h3 className="self-stretch text-center font-heading text-xl font-bold text-white">
                {service.title}
              </h3>
              <p className="max-w-[283px] text-center font-body text-sm font-bold leading-normal text-sand">
                {service.description}
              </p>

              <Link
                href="/services"
                className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 text-center font-body text-sm font-bold text-accent transition-colors hover:text-white"
              >
                Learn More
                <span
                  className="material-symbols-outlined text-base"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <OutlinedCtaButton href="/services">View All Services</OutlinedCtaButton>
        </div>
      </div>
    </section>
  )
}
