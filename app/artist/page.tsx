import type { Metadata } from 'next';
import { SiteHeader } from '@/components/features/layout/SiteHeader';
import { SiteFooter } from '@/components/features/layout/SiteFooter';
import LoadMoreArtists from '@/components/features/artist/LoadMoreArtists';
import CTASection from '@/components/ui/CTASection';
import NavLinks from '@/components/ui/NavLinks';
import { getArtists } from '@/lib/content/artists';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Artists',
  description:
    'Meet the artists, songwriters, producers, and visual talent represented by Richworld.',
  path: '/artist',
});

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="w-full h-fit bg-primary ">
      <SiteHeader />

      <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col justify-start px-4 text-center sm:mt-20 sm:px-6">
        <h1
          className="
            max-w-6xl font-['Open_Sans',sans-serif] text-start
            text-3xl font-bold leading-tight text-white
            sm:text-4xl
            md:text-5xl
            lg:text-[60px] lg:leading-[1.35]
          "
        >
          Meet the Legends We&apos;re Building
        </h1>

        <p
          className="
            mt-3 max-w-4xl font-['Open_Sans',sans-serif] text-start
            text-base font-semibold leading-relaxed text-sand
            sm:mt-4 sm:text-lg
            md:text-xl
            lg:leading-[1.4]
          "
        >
          A curated roster of the icons represented by Richworld.
        </p>

        <div className="mt-10 mb-12 flex w-full justify-start sm:mt-12 sm:mb-16">
          <NavLinks links={['All', 'Afrobeats', 'R&B', 'Hip-Hop']} defaultActive="All" />
        </div>
      </section>

      <div className="mb-20">
        <LoadMoreArtists artists={artists} />
      </div>

      <div>{<CTASection />}</div>

      <SiteFooter />
    </div>
  );
}
