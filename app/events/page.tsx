import { SiteHeader } from "@/components/features/layout/SiteHeader"
import { SiteFooter } from "@/components/features/layout/SiteFooter"
import HeroSection from "@/components/ui/HeroSection"
import EventCard from "@/components/features/events/EventCard"
import { getUpcomingEvents } from "@/lib/content/events"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Events",
  description:
    "Join us at upcoming events, get tickets, and discover event hosting services.",
  path: "/events",
})

export default async function EventsPage() {
  const events = await getUpcomingEvents()

  return (
    <div className="w-full h-fit bg-primary">
      <SiteHeader />
      <HeroSection
        HeroText="Join Us at Our Next Event"
        HeroSubText="From Brand to Legend. Discover our events, get your tickets, and request event hosting services."
      />

      <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col justify-start px-4 text-center sm:mt-20 sm:px-6">
        <h2
          className="max-w-6xl font-['Open_Sans',sans-serif] text-start
            text-3xl font-bold leading-tight text-white
            sm:text-4xl
            md:text-5xl
            mt-20
            lg:text-[40px] lg:leading-[1.35]"
        >
          Upcoming Events and Dates
        </h2>

        <div className="mt-5 mb-10">
          <EventCard events={events} />
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}