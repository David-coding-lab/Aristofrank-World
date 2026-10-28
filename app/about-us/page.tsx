import Link from "next/link"
import { SiteHeader } from "@/components/features/layout/SiteHeader";
import { SiteFooter } from "@/components/features/layout/SiteFooter";
import PhilosophyCard from "@/components/features/about-us/PhilosophyCard"
import StorySnippet from "@/components/features/about-us/StorySnippet";
import CTASection from "@/components/ui/CTASection";
import Image from "next/image";
import TeamCard from "@/components/features/about-us/TeamCard";

function AboutUs() {

    const ourPhilosophy =[
        {
            id: 1,
            iconUrl: "/Rocket.png",
            cardTitle: "Our Mission",
            cardDescription: "To empower brands by crafting unique identities and compelling  narratives that resonates with their target audience",
        },
        {
            id: 2,
            iconUrl: "/Eye.png",
            cardTitle: "Our Vision",
            cardDescription: "To be the leading partner for brands aspiring to make a lasting impact in a dynamic global market.",
        },
        {
            id: 3,
            iconUrl: "/Heart.png",
            cardTitle: "Our Values",
            cardDescription: "Creativity, partnership and integrity are the cornerstones of every project we undertake.",
        },
    ]

    const stories = [
        {
            title: "The Spark of an Idea",
            time: "2018",
            story:
            "It all started with a simple belief that every brand has a unique story waiting to be told. Our founder sketched out the initial vision for a creative agency built on collaboration and bold ideas.",
            style: "left" as const,
            icon: <Image src="/Idea.png" alt="Lightbulb" width={24} height={24} />,
        },
        {
            title: "Building the Vision",
            time: "2020",
            story:
            "We transformed our initial vision into a creative practice, bringing ambitious ideas to life through thoughtful design and collaboration.",
            style: "right" as const,
            icon: <Image src="/Diamond.png" alt="Users" width={24} height={24} />,
        },
        {
            title: "Expanding Our Reach",
            time: "2022",
            story:
            "Our team grew, our partnerships expanded, and we began helping more ambitious brands communicate their stories to the world.",
            style: "left" as const,
            icon: <Image src="/People.png" alt="Rocket" width={24} height={24} />,
        },
        {
            title: "A Growing Legacy",
            time: "2024",
            story:
            "We continue to push creative boundaries, building meaningful brand identities and helping our clients achieve lasting impact.",
            style: "right" as const,
            icon: <Image src="/Warranty.png" alt="Trophy" width={24} height={24} />,
        },
    ];
    
    const team = [
        {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            name: "God's Power George",
            role: "Graphics Designer",
            description:
            "Aristofrank the visionary leader who started it all, with a passion for transforming brands into market leaders.",
        },
        {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            name: "Jane Doe",
            role: "Brand Strategist",
            description:
            "Turns market insight into clear brand direction that helps clients stand out.",
        },
        {
            id: 3,
            imageUrl: "https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            name: "John Smith",
            role: "Creative Director",
            description:
            "Leads our creative team in shaping bold, memorable visual identities.",
        },
    ];


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

        
         <div className="flex flex-col gap-16 md:gap-24">
            {stories.map((item) => (
                <StorySnippet key={item.time} {...item} />
            ))}
        </div>

        <div className="w-full flex-col flex items-center text-center mt-20 mb-20">
            <h1 className="max-w-3xl font-['Open_Sans',sans-serif]
                text-3xl font-semibold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Meet the Team</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand
                    sm:mt-4 sm:text-lg
                    md:text-xl
                    lg:text-[18px] lg:leading-[1.4]"
                >
                    The creative minds and strategic thinkers behind our success.
                </p>
        </div>

        <div
            className="mx-auto mb-20 grid w-full max-w-7xl
                grid-cols-1 gap-5 px-4
                sm:grid-cols-2 sm:gap-6 sm:px-6
                lg:grid-cols-3 lg:gap-8 lg:px-8"
        >
            {team.map((member) => (
                <TeamCard
                key={member.id}
                imageUrl={member.imageUrl}
                name={member.name}
                role={member.role}
                description={member.description}
                />
            ))}
        </div>


        <CTASection />
        <SiteFooter />

   </div>
  )
}

export default AboutUs