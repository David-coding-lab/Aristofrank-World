import { SiteHeader } from "@/components/features/layout/SiteHeader"
import { SiteFooter } from "@/components/features/layout/SiteFooter"
import { HeroHeader } from "@/components/features/home/HeroHeader"
import { ServicesSection } from "@/components/features/home/ServicesSection"
import { FeaturedArtists } from "@/components/features/home/FeaturedArtists"
import { TestimonialsSection } from "@/components/features/home/TestimonialsSection"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroHeader />
        <ServicesSection />
        <FeaturedArtists />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  )
}
