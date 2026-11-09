import { SiteHeader } from '@/components/features/layout/SiteHeader';
import { SiteFooter } from '@/components/features/layout/SiteFooter';
import MusicBanner from '@/components/features/music-production/MusicBanner';
import RecentProjects from '@/components/features/music-production/RecentProjects';
import Link from 'next/link';
import ArtistsCard from '@/components/features/music-production/ArtistsCard';
import { getMusic } from '@/lib/content/music';
import { getArtists } from '@/lib/content/artists';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Music Production',
  description: 'Custom music production, composition, recording, mixing, and sonic branding.',
  path: '/music-production',
});

async function MusicProduction() {
  const [music, artists] = await Promise.all([getMusic(4), getArtists()]);

  return (
    <div className="w-full h-fit bg-primary">
      <SiteHeader />

      <main className="mx-auto max-w-6xl p-6">
        <MusicBanner
          songName={music[0]?.title ?? 'Midnight Drive'}
          songDescription={
            music[0]?.description ??
            'Full track production for emerging artist. A blend of synth-wave and modern pop, crafted to make an impact.'
          }
          songPlayLink={music[0]?.artistProfileUrl ?? '/productions/midnight-drive'}
          songImage={
            music[0]?.coverImage ??
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
          }
        />
      </main>

      <div className="mx-auto mt-20 max-w-6xl py-6 flex justify-between items-center">
        <h3
          className="font-['Open_Sans',sans-serif] text-2xl
                font-bold leading-tight text-white
                sm:text-3xl lg:text-2xl"
        >
          Top Artists
        </h3>

        <Link href="/artist">
          <p className="text-accent">See More</p>
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-10">
        {artists.map((artist) => (
          <ArtistsCard
            key={artist.id}
            artistName={artist.name}
            artistRoles={artist.genre.join(', ')}
            artistImage={artist.profileImage}
            artistLink={artist.profileUrl}
          />
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-6xl py-10 flex justify-between items-center">
        <h3
          className="font-['Open_Sans',sans-serif] text-2xl
                font-bold leading-tight text-white
                sm:text-3xl lg:text-2xl"
        >
          Recent Projects
        </h3>
      </div>

      <RecentProjects tracks={music} />
      <SiteFooter />
    </div>
  );
}

export default MusicProduction;
