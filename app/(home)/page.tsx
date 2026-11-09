import { SiteHeader } from '@/components/features/layout/SiteHeader';
import { SiteFooter } from '@/components/features/layout/SiteFooter';
import { HeroHeader } from '@/components/features/home/HeroHeader';
import { ServicesSection } from '@/components/features/home/ServicesSection';
import { FeaturedArtists } from '@/components/features/home/FeaturedArtists';
import { TestimonialsSection } from '@/components/features/home/TestimonialsSection';
import { getFeaturedArtists } from '@/lib/content/artists';
import { getTestimonials } from '@/lib/content/testimonials';

export default async function Home() {
  const [featuredArtists, testimonials] = await Promise.all([
    getFeaturedArtists(),
    getTestimonials(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroHeader />
        <ServicesSection />
        <FeaturedArtists artists={featuredArtists} />
        <TestimonialsSection testimonials={testimonials} />
      </main>
      <SiteFooter />
    </>
  );
}
