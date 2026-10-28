import Link from "next/link"
import { SiteHeader } from "@/components/features/layout/SiteHeader";
import { SiteFooter } from "@/components/features/layout/SiteFooter";
import PhilosophyCard from "@/components/features/about-us/PhilosophyCard"

function AboutUs() {

    const ourPhilosophy =[
        {
            id: 1,
            iconUrl: "/Rocket.png",
            cardTitle: "Our Mission",
            cardDescription: "To empower brands by crafting unique identities and compelling  narratives that resonates with their target audience",
        },
        {
            id: 1,
            iconUrl: "/Eye.png",
            cardTitle: "Our Vision",
            cardDescription: "To be the leading partner for brands aspiring to make a lasting impact in a dynamic global market.",
        },
        {
            id: 1,
            iconUrl: "/Heart.png",
            cardTitle: "Our Values",
            cardDescription: "Creativity, partnership and integrity are the cornerstones of every project we undertake.",
        },
    ]


  return (
   <div className="bg-primary w-full h-fit">
        <SiteHeader />

        <section
        className="
            relative flex w-full items-center justify-center
            overflow-hidden bg-[#201F18] bg-cover bg-center
            bg-no-repeat px-5 py-20 text-center
            sm:min-h-105 sm:py-24
            lg:min-h-123.75 lg:py-28
        "
        >
        {/* Background overlay */}
        <div
            className="absolute inset-0 bg-black/20"
            aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
            <h1
            className="
                max-w-3xl font-['Open_Sans',sans-serif]
                text-3xl font-bold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[60px] lg:leading-[1.35]
            "
            >
            About Us
            </h1>

            <p
            className="
                mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                text-base font-semibold leading-relaxed
                text-sand
                sm:mt-4 sm:text-lg
                md:text-xl
                lg:text-xl lg:leading-[1.4]
            "
            >
                We are a collective of creators, strategist, and innovators dedicated to building unforgettable
                brands that leaves a lasting impact.
            </p>

            <Link
            href={'/services'}
            className="
                mt-6 inline-flex items-center justify-center
                rounded-md bg-accent px-6 py-3
                font-semibold text-[#171611]
                transition-colors hover:bg-white
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-white
            "
            >
                Our services
            </Link>
        </div>
        </section>

        <div className="w-full flex-col flex items-center text-center mt-20 mb-20">
            <h1 className="max-w-3xl font-['Open_Sans',sans-serif]
                text-3xl font-semibold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Our Philosophy</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand
                    sm:mt-4 sm:text-lg
                    md:text-xl
                    lg:text-[18px] lg:leading-[1.4]"
                >
                    We are driven by a core set of principles that define our approach to brand building and our 
                    commitment to clients.
                </p>
        </div>

        <div
            className="mx-auto grid w-full max-w-7xl
                grid-cols-1 gap-5 px-4 mb-20
                sm:grid-cols-2 sm:gap-6 sm:px-6
                lg:grid-cols-3 lg:gap-8 lg:px-8"
            >
                {ourPhilosophy.map((i) => (
                    <PhilosophyCard
                        key={i.id}
                        iconUrl={i.iconUrl}
                        cardTitle={i.cardTitle}
                        cardDescription={i.cardDescription}
                    />
                ))}
            
        </div>

        <div className="w-full flex-col flex items-center text-center mt-20 mb-20">
            <h1 className="max-w-3xl font-['Open_Sans',sans-serif]
                text-3xl font-semibold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Our Story</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand
                    sm:mt-4 sm:text-lg
                    md:text-xl
                    lg:text-[18px] lg:leading-[1.4]"
                >
                    From a humble beginning to a global force in branding. our journey is one of passion, persistence,
                    and partnership.
                </p>
        </div>

        <SiteFooter />

   </div>
  )
}

export default AboutUs