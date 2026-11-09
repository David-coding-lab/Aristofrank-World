import Image from "next/image"
import Link from "next/link"
import { OutlinedCtaButton } from "@/components/ui/OutlinedCtaButton"
import type { ArtistSummary } from "@/lib/content/types"

interface FeaturedArtistsProps {
  artists: ArtistSummary[]
}

/**
 * "Our Featured Artist" — pulls the featured roster from the database while
 * keeping the descriptive alt text and sizes pattern required for SEO.
 */
export function FeaturedArtists({ artists }: FeaturedArtistsProps) {
  if (artists.length === 0) return null

  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
          Our Featured Artist
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
          The talents we are proud to represent — artists building their own
          legends with us.
        </p>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist) => {
            const href = artist.profileUrl
            const isExternal = href.startsWith("http")

            return (
              <article key={artist.id} className="w-full max-w-[265px]">
                <Link
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={`View ${artist.name}'s profile`}
                  className="group relative block h-[350px] w-full overflow-hidden rounded-[8px]"
                >
                  <Image
                    src={artist.profileImage}
                    alt={`${artist.name} — ${artist.genre.join(", ")}`}
                    width={480}
                    height={640}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-black/60"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                    <h3 className="self-stretch font-heading text-xl font-extrabold text-white">
                      {artist.name}
                    </h3>
                    <p className="self-stretch font-body text-sm font-semibold text-[#808080]">
                      {artist.genre.join(", ")}
                    </p>
                    <span className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 self-stretch font-body text-xs font-bold text-accent transition-colors group-hover:text-white">
                      View Profile
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <OutlinedCtaButton href="/artist">
            Discover More Artists
          </OutlinedCtaButton>
        </div>
      </div>
    </section>
  )
}
