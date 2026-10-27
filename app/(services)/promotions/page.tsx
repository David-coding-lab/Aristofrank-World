import HeroSection from "@/components/ui/HeroSection";
import { SiteHeader } from "@/components/features/layout/SiteHeader";
import { SiteFooter } from "@/components/features/layout/SiteFooter";
import OurApproachCard from "@/components/features/promotions/OurApproachCard";
import ServiceDropDown from "@/components/features/promotions/ServiceDropDown";
import CreativeCards from "@/components/features/creative-design/CreativeCards";
import CTASection from "@/components/ui/CTASection";

function Promotions() {
    const approaches = [
        {
            id: 1,
            image: "/reach.png",
            ourApproach: "Strategic Reach",
            description:
            "Connecting your brand with the right audience, at the right time.",
        },
        {
            id: 2,
            image: "/elevation.png",
            ourApproach: "Brand Elevation",
            description:
            "Creating a narrative that resonates and endures.",
        },
        {
            id: 3,
            image: "/measurable.png",
            ourApproach: "Measured Results",
            description:
            "Delivering clear, Impactful outcomes for your investment.",
        },
    ];

    const services = [
        {
            service: "Digital Marketing & SEO",
            description:
            "Our digital marketing strategies are designed to build a powerful online presence, driving organic growth and targeted engagement through search engine operation, content marketing, and paid media.",
        },
        {
            service: "Social Media Campaigns ",
            description:
            "We design intuitive, accessible, and user-friendly digital experiences that help users achieve their goals.",
        },
        {
            service: "Public Relations & Media Outreach",
            description:
            "We build responsive, high-performance websites tailored to your brand, business goals, and audience.",
        },
        {
            service: "Content Creation & Management",
            description:
            "We create compelling, high-quality content that resonates with your audience and drives engagement.",
        },
    ];

    const ourTriumps = [
        {
            id: 1,
            designTitle: "Nova Records - Digital Launch",
            designDescription: "A complete visual overhaul for a tech giant, projecting innovation and trust.",
            designImgUrl: "/Nova.png",
        },
        {
            id: 2,
            designTitle: "Aether Apperal - Brand Relaunch",
            designDescription: "Creating an elegant and memorable packaging experience for an artisanal coffee brand.",
            designImgUrl: "/Aether.png",
        },
    ];

  return (
    <div className="w-full h-fit bg-primary">
        <SiteHeader />
        
        <HeroSection HeroText="Forging Legends" HeroSubText="Transforming brands into legends through strategic, impactful
            promotions."
        />

         <div className="w-full flex-col flex items-center text-center mt-20 mb-20">
            <h1 className="max-w-3xl font-['Open_Sans',sans-serif]
                text-3xl font-semibold leading-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Our Approach</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand md:text-center
                    sm:mt-4 sm:text-lg
                    md:text-xl
                    lg:text-[18px] lg:leading-[1.4]"
                >
                    We combine timeless strategy with modern execution to elevate your brand beyond the noise. our promotions are not just campaigns; they are the beginning of a legacy.
                </p>

            <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {approaches.map((approach) => (
                    <OurApproachCard
                    key={approach.id}
                    image={approach.image}
                    ourApproach={approach.ourApproach}
                    description={approach.description}
                    />
                ))}
            </section>

        </div>


        <div className="w-full flex-col flex items-center text-start mt-20 mb-20">
            <h1 className="max-w-3xl lg:w-4xl lg:max-w-4xl font-['Open_Sans',sans-serif] text-start
                text-3xl font-semibold leading-tight text-white
                sm:text-3xl
                md:text-4xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Our Promotion Services</h1>
           
           
       <section className="mx-auto mt-10 mb-10 flex w-full max-w-4xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
            {services.map((item) => (
                <ServiceDropDown
                key={item.service}
                service={item.service}
                description={item.description}
                />
            ))}
        </section>
        </div>

        <div className="w-full flex-col flex items-center lg:text-start text-center mt-20 mb-20">
            <h1 className="max-w-3xl lg:w-4xl lg:max-w-4xl font-['Open_Sans',sans-serif] text-start
                text-3xl font-semibold leading-tight text-white
                sm:text-3xl
                md:text-4xl
                lg:text-[30px] lg:leading-[1.35]"
            >
                Our Triumphs</h1>
                <p className="mt-3 max-w-4xl font-['Open_Sans',sans-serif]
                    text-base font-semibold leading-relaxed
                    text-sand
                    sm:mt-4 sm:text-lg
                    md:text-xl
                    lg:text-[18px] lg:leading-[1.4]"
                >
                    We combine timeless strategy with modern execution to elevate your brand beyond the noise. our promotions are not just campaigns; they are the beginning of a legacy
                </p>

                 <section className="mx-auto grid w-full max-w-4xl
                    grid-cols-1 gap-6 px-4
                    sm:px-6 items-center mt-10
                    lg:grid-cols-2 lg:gap-8 lg:px-8"
                >
                    {ourTriumps.map((design) => (
                        <CreativeCards  
                            key={design.id}
                            designTitle={design.designTitle}
                            designDescription={design.designDescription}
                            designImgUrl={design.designImgUrl}
                        />
                    ))}
                </section>

        </div>

        <div className="mb-10">
            <CTASection />
        </div>

        <SiteFooter />
    </div>
  )
}

export default Promotions