import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/features/layout/SiteHeader"
import { SiteFooter } from "@/components/features/layout/SiteFooter"
import ProfileBanner from "@/app/artist/[profile]/components/ProfileBanner"
import MusicPlayer from "@/components/features/music-production/MusicPlayer"
import TrackList from "@/components/features/music-production/TrackList"
import ArtistsCard from "@/components/features/music-production/ArtistsCard"
import CTASection from "@/components/ui/CTASection"
import { ArtistBreadcrumbs } from "@/components/features/artist/ArtistBreadcrumbs"
import { ArtistJsonLd } from "@/components/features/artist/ArtistJsonLd"
import { getArtistByProfileUrl, getRelatedArtists } from "@/lib/content/artists"
import { getMusic } from "@/lib/content/music"
import { pageMetadata, truncateDescription } from "@/lib/seo"

interface ArtistProfilePageProps {
  params: Promise<{ profile: string }>
}

export async function generateMetadata({
  params,
}: ArtistProfilePageProps): Promise<Metadata> {
  const { profile } = await params
  const artist = await getArtistByProfileUrl(profile)

  if (!artist) {
    return {
      title: "Artist not found",
      robots: { index: false, follow: false },
    }
  }

  return pageMetadata({
    title: artist.name,
    description: truncateDescription(artist.bio),
    path: artist.profileUrl,
    imageUrl: artist.profileImage,
    imageAlt: `${artist.name} — ${artist.genre.join(", ")}`,
  })
}

export default async function ArtistProfilePage({
  params,
}: ArtistProfilePageProps) {
  const { profile } = await params
  const artist = await getArtistByProfileUrl(profile)

  if (!artist) notFound()

  const [music, relatedArtists] = await Promise.all([
    getMusic(),
    getRelatedArtists(artist.id),
  ])

  return (
    <div className="w-full h-fit bg-primary">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <ArtistBreadcrumbs
          artistName={artist.name}
          artistSlug={artist.profileUrl}
        />
        <ProfileBanner
          artistName={artist.name}
          artistDescription={artist.bio}
          artistImage={artist.profileImage}
          artistSongStyle={artist.genre.join(", ")}
        />
      </main>

      <div className="mx-auto mt-20 flex max-w-6xl items-center justify-between px-4 py-10 sm:px-6">
        <h2 className="font-['Open_Sans',sans-serif] text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-2xl">
          Songs
        </h2>
      </div>

      <div className="mx-auto max-w-6xl mb-20">
        <MusicPlayer track={null} progress={0} onClose={() => {}} />
        <TrackList
          tracks={music.map((t) => ({
            id: t.id,
            title: t.title,
            artist: artist.name,
            cover: t.coverImage,
            duration: t.duration,
          }))}
          onSelectTrack={() => {}}
        />
      </div>

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
            artistRoles={related.genre.join(", ")}
            artistImage={related.profileImage}
            artistLink={related.profileUrl}
          />
        ))}
      </div>

      <div>{<CTASection />}</div>

      <SiteFooter />

      <ArtistJsonLd artist={artist} />
    </div>
  )
}
