import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/features/layout/SiteHeader"
import { SiteFooter } from "@/components/features/layout/SiteFooter"
import ProfileBanner from "@/app/artist/[profile]/components/ProfileBanner"
import RecentProjects from "@/components/features/music-production/RecentProjects"
import ArtistsCard from "@/components/features/music-production/ArtistsCard"
import CTASection from "@/components/ui/CTASection"
import { ArtistBreadcrumbs } from "@/components/features/artist/ArtistBreadcrumbs"
import { ArtistJsonLd } from "@/components/features/artist/ArtistJsonLd"
import { getArtistBySlug, getRelatedArtists } from "@/lib/content/artists"
import { getArtistTracks } from "@/lib/content/tracks"
import { pageMetadata, truncateDescription } from "@/lib/seo"

interface ArtistProfilePageProps {
  params: Promise<{ profile: string }>
}

export async function generateMetadata({
  params,
}: ArtistProfilePageProps): Promise<Metadata> {
  const { profile } = await params
  const artist = await getArtistBySlug(profile)

  if (!artist) {
    return {
      title: "Artist not found",
      robots: { index: false, follow: false },
    }
  }

  return pageMetadata({
    title: artist.name,
    description: truncateDescription(artist.bio),
    path: `/artist/${artist.slug}`,
    imageUrl: artist.imageUrl,
    imageAlt: `${artist.name} — ${artist.roles}`,
  })
}

export default async function ArtistProfilePage({
  params,
}: ArtistProfilePageProps) {
  const { profile } = await params
  const artist = await getArtistBySlug(profile)

  if (!artist) notFound()

  const [tracks, relatedArtists] = await Promise.all([
    getArtistTracks(artist.id),
    getRelatedArtists(artist.id),
  ])

  return (
    <div className="w-full h-fit bg-primary">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <ArtistBreadcrumbs
          artistName={artist.name}
          artistSlug={artist.slug}
        />
        <ProfileBanner
          artistName={artist.name}
          artistDescription={artist.bio}
          artistImage={artist.imageUrl}
          artistSongStyle={artist.roles}
        />
      </main>

      <div className="mx-auto mt-20 flex max-w-6xl items-center justify-between px-4 py-10 sm:px-6">
        <h2 className="font-['Open_Sans',sans-serif] text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-2xl">
          Songs
        </h2>
      </div>

      <RecentProjects tracks={tracks} />

      <div className="mx-auto mt-20 flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <h2 className="font-['Open_Sans',sans-serif] text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-2xl">
          More Artists
        </h2>

        <Link href="/artist" className="text-accent">
          See More
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {relatedArtists.map((related) => (
          <ArtistsCard
            key={related.id}
            artistName={related.name}
            artistRoles={related.roles}
            artistImage={related.imageUrl}
            artistLink={
              related.externalUrl ?? `/artist/${related.slug}`
            }
          />
        ))}
      </div>

      <div>{<CTASection />}</div>

      <SiteFooter />

      <ArtistJsonLd artist={artist} />
    </div>
  )
}
