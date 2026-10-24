import { SiteHeader } from "@/components/features/layout/SiteHeader";
import Image from "next/image";
import { alt } from '../opengraph-image';

function Services() {
  return (
    <>
        <SiteHeader />
        <main className="w-flex h-screen bg-primary">
            <div className="flex flex-col items-left justify-start w-full h-full gap-4 pl-40 pt-30">
                <h1 className="text-5xl font-medium text-secondary" style={{fontFamily: 'var(--font-open-sans)'}}>Creating Legacies, One Brand at a Time</h1>
                <h4 className="text-lg text-sand" style={{fontFamily: 'var(--font-open-sans)'}}>Our comprehensive suit of services to elevate your brand to legendary status.</h4>
            </div>

            <div>
                <ServiceCard
                    serviceTitle="Creative Design"
                    serviceDescription="Our creative design services are the cornerstone of a
legendary brand. We build visual identities that are not only beautiful but also strategically sound. ensuring every element tells your unique story."
                    serviceIconUrl="/brand-strategy-icon.svg"
                    serviceOffers={[
                        "Logo Design & Identity ",
                        "Brand Guidelines",
                        "Digital Graphics & Social Media Assets",
                        "Print Media & Packaging"
                    ]}
                    serviceLink="/services/creative-design"
                />

                <ServiceCard
                    serviceTitle="Promotions"
                    serviceDescription="We create and execute targeted promotional campaign that capture attention, engage audiences, and drive measurable result for your brand."
                    serviceIconUrl="/digital-marketing-icon.svg"
                    serviceOffers={[
                        "Digital Marketing & Social Media Campaigns",
                        "Public Relations & Media Outreach",
                        "Event Promotion & Management",
                    ]}
                    serviceLink="/services/promotions"
                />

                <ServiceCard
                    serviceTitle="Video Production"
                    serviceDescription="Our full-service video production team brings your stories to life with cinematic quality. We manage the entire creative process to produce compelling visual narratives that captivate your audience and amplify your brand message."
                    serviceIconUrl="/web-design-icon.svg"
                    serviceOffers={[
                        "Concept Development & Scriptwriting",
                        "Filming & On-Set Production",
                        "Editing & Post-Production",
                        "Motion Graphics & Animation"
                    ]}
                    serviceLink="/services/video-production"
                />

                <ServiceCard
                    serviceTitle="Music Production"
                    serviceDescription="Crafting bespoke soundtracks and audio experiences that resonate with your audience and elevate your brand's auditory identity."
                    serviceIconUrl="/content-creation-icon.svg"
                    serviceOffers={[
                        "Composition & Arrangement",
                        "Recording & Sound Design",
                        "Mixing & Mastering",
                        "Jingles & Sonic Branding"
                    ]}
                    serviceLink="/services/music-production"
                />
            </div>

        </main> 
    </>
  )
}

export default Services

interface ServiceCardProps {
  serviceTitle: string;
  serviceDescription: string;
  serviceIconUrl: string;
  serviceOffers: string[];
  serviceLink: string;
}



const ServiceCard = ({ serviceTitle, serviceDescription, serviceIconUrl, serviceOffers, serviceLink }: ServiceCardProps) => {
  return (
    <div className="">
      <Image
        src={serviceIconUrl}
        alt={`${serviceTitle} icon`}
        width={64}
        height={64}
        className="mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{serviceTitle}</h2>
      <p className="mb-4">{serviceDescription}</p>
      <ul className="space-y-2">
        {serviceOffers.map((offer) => (
          <li key={offer}>{offer}</li>
        ))}
      </ul>

      <a href={serviceLink} className="text-blue-500 hover:underline mt-4 inline-block">Learn More</a>
    </div>
  );
}; 