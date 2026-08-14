import Image from "next/image"
import Link from "next/link"
import { OutlinedCtaButton } from "@/components/ui/OutlinedCtaButton"

/**
 * Placeholder artist portraits. Replace with real Appwrite/ImageKit artwork
 * when the talent catalogue lands — keep the descriptive alt + sizes pattern.
 */
const ARTISTS = [
  {
    name: "Adeola Bamidele",
    role: "Afrobeats Artist",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Emeka Obi",
    role: "Music Producer",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Zara Mensah",
    role: "Visual Artist",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Chuka Nwosu",
    role: "Film Director",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
]

/**
 * "Our Featured Artist."
 */
export function FeaturedArtists() {
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
          {ARTISTS.map((artist) => (
            <article
              key={artist.name}
              className="group relative h-[350px] w-full max-w-[265px] overflow-hidden rounded-[8px]"
            >
              <Image
                src={artist.imageUrl}
                alt={`${artist.name} — ${artist.role}`}
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
                  {artist.role}
                </p>
                <Link
                  href="/artist"
                  aria-label={`View ${artist.name}'s profile`}
                  className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 self-stretch font-body text-xs font-bold text-accent transition-colors hover:text-white"
                >
                  View Profile
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <OutlinedCtaButton href="/artist">Discover More Artists</OutlinedCtaButton>
        </div>
      </div>
    </section>
  )
}
