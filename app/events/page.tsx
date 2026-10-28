import {SiteHeader} from '@/components/features/layout/SiteHeader'
import {SiteFooter} from '@/components/features/layout/SiteFooter'
import HeroSection from '@/components/ui/HeroSection'
import EventCard from '@/components/features/events/EventCard'

function Events() {
  return (
    <div className="w-full h-fit bg-primary">
      <SiteHeader />
      <HeroSection
        ButtonLink={'View Upcoming Events'}
        HeroText={'Join Us at Our Next Event'}
        HeroSubText={'From Brand to Legend. Discover our events, get your tickets, and request event hosting services.'}
        url={'https://google.com'}
      />

      <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col justify-start px-4 text-center sm:mt-20 sm:px-6">
        <h3
          className="max-w-6xl font-['Open_Sans',sans-serif] text-start
            text-3xl font-bold leading-tight text-white
            sm:text-4xl
            md:text-5xl
            mt-20
            lg:text-[40px] lg:leading-[1.35]"
        > Upcoming Events and Dates</h3>

        <div className="mt-5 mb-10 ">
          <EventCard />
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}

export default Events
