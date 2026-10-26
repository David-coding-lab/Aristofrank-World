import { SiteHeader } from "@/components/features/layout/SiteHeader";
import { SiteFooter } from "@/components/features/layout/SiteFooter";
import DesignCards from "@/components/features/creative-design/DesignCards"
import CreativeCards from "@/components/features/creative-design/CreativeCards"
import HeroSection from "@/components/ui/HeroSection"
import CTASection from '@/components/ui/CTASection'


function CreativeDesign() {
    const ourStrategies =[
        {
            iconUrl: "/sparkle.png",
            cardTitle: "Strategic Branding",
            cardDescription: "Every choice is purposefully angled with your brands core strategy and long-term vision.",
        },
        {
            iconUrl: "/timer.png",
            cardTitle: "Timeless Aesthetics",
            cardDescription: "We create design that transcend trends, ensuring your brand remains relevant and powerful for years to come.",
        },
        {
            iconUrl: "/bolt.png",
            cardTitle: "Impact Results",
            cardDescription: "Our visual are created to resonate with your audience, drive engagement, and deliver measurable business outcomes.",
        },
    ]

    const creativeDesigns = [
        {
            id: 1,
            designTitle: "Logo Identity",
            designDescription:
            "Crafting unique, memorable logos and complete visual identity system that form the cornerstone of your brand’s legend.",
            designImgUrl: " https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
            id: 2,
            designTitle: "Brand Guidelines",
            designDescription:
            "Developing comprehensive books to ensure unwavering consistency across all platforms and communication.",
            designImgUrl: "https://images.unsplash.com/photo-1664520132859-727fc515fc8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
            id: 3,
            designTitle: "Digital Graphics",
            designDescription:
            "Designing capturing web banners, social media assets, and digital ad creative that steps the scroll and drives action.",
            designImgUrl: "https://images.unsplash.com/photo-1710799885122-428e63eff691?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
        {
            id: 4,
            designTitle: "Print Media ",
            designDescription:
            "Creating tangible brand equipment through expertly designed brochures, business cards, packaging and more,",
            designImgUrl: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        },
    ];

    const featuredWorks = [
        {
            id: 1,
            designTitle: "Fresh Market, Re-branding",
            designDescription:
            "A complete visual overhaul for a tech giant, projecting innovation and trust.",
            designImgUrl: "/fresh-market-showcase.png",
        },
        {
            id: 2,
            designTitle: "Aroma Roast Coffee Packaging",
            designDescription:
            "Creating an elegant and memorable packaging experience for an artisanal coffee brand.",
            designImgUrl: "/aroma-roast-showcase.png",
        },
    ];
  return (
    <div className="w-full h-fit bg-primary">
        <SiteHeader />

        <HeroSection
            HeroText="Creative Design"
            HeroSubText="Building Visual Identities That Become Legends."
        />

        <div className="w-full flex-col flex items-center text-center mt-20 mb-20">
            <h1 className="max-w-3xl font-['Open_Sans',sans-serif]
                text-3xl font-semibold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Our Philosophy on Creative Design</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand
                    sm:mt-4 sm:text-lg
                    md:text-xl
                    lg:text-[18px] lg:leading-[1.4]"
                >
                    At Aristofrank World, we believe creative design is more than aesthetics; it’s the visual soul of a brand. we craft strategic timeless and impact visual identities that don’t just capture
                    attention - they build legacies.</p>



        </div>

        <div
            className="mx-auto grid w-full max-w-7xl
                grid-cols-1 gap-5 px-4 mb-20
                sm:grid-cols-2 sm:gap-6 sm:px-6
                lg:grid-cols-3 lg:gap-8 lg:px-8"
            >
                {ourStrategies.map((i) => (
                    <DesignCards
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
                Our Creative Services</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand
                    sm:mt-4 sm:text-lg
                    md:text-xl mb-10
                    lg:text-[18px] lg:leading-[1.4]"
                >A Comprehensive suite of design services to build and elevate your brand.</p>

            
           <section className="mx-auto grid w-full max-w-7xl
                grid-cols-1 gap-6 px-4
                sm:px-6
                lg:grid-cols-2 lg:gap-8 lg:px-8"
            >
            {creativeDesigns.map((design) => (
                    <CreativeCards
                        key={design.id}
                        designTitle={design.designTitle}
                        designDescription={design.designDescription}
                        designImgUrl={design.designImgUrl}
                    />
                ))}
            </section>
        </div>
       
       
        <div className="w-full flex-col flex items-center text-center mt-20 mb-20">
            <h1 className="max-w-3xl font-['Open_Sans',sans-serif]
                text-3xl font-semibold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Featured Works</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand
                    sm:mt-4 sm:text-lg
                    md:text-xl mb-10
                    lg:text-[18px] lg:leading-[1.4]"
                >Witness the legends we\ve helped build.</p>

            
           <section className="mx-auto grid w-full max-w-7xl
                grid-cols-1 gap-6 px-4
                sm:px-6
                lg:grid-cols-2 lg:gap-8 lg:px-8"
            >
            {featuredWorks.map((design) => (
                    <CreativeCards
                        key={design.id}
                        designTitle={design.designTitle}
                        designDescription={design.designDescription}
                        designImgUrl={design.designImgUrl}
                    />
                ))}
            </section>

        </div>
        <CTASection />
        <SiteFooter />
    </div>
  )
}

export default CreativeDesign