import { SiteHeader } from "@/components/features/layout/SiteHeader";
import CTASection from "@/components/ui/CTASection.tsx"
import Image from "next/image";
import { alt } from '../opengraph-image';

import DesignIcon from '@/app/assets/graphics.png'
import PromotionIcon from '@/app/assets/promotion.png'
import VideoProdIcon from '@/app/assets/video.png'
import MusicProd from '@/app/assets/music.png'

export default function Services() {
  return (
    <>
        <SiteHeader />
        <main className="w-flex h-fit bg-primary pb-10">
            <div className="flex flex-col items-left justify-start w-full gap-4 pl-40 pt-30">
                <h1 className="text-5xl font-medium text-secondary" style={{fontFamily: 'var(--font-open-sans)'}}>Creating Legacies, One Brand at a Time</h1>
                <h4 className="text-lg text-sand" style={{fontFamily: 'var(--font-open-sans)'}}>Our comprehensive suit of services to elevate your brand to legendary status.</h4>
            </div>

            <div className='flex flex-wrap gap-5 pl-40 pt-10'>
                <ServiceCard
                    serviceTitle="Creative Design"
                    serviceDescription="Our creative design services are the cornerstone of a
legendary brand. We build visual identities that are not only beautiful but also strategically sound. ensuring every element tells your unique story."
                    serviceIconUrl={DesignIcon}
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
                    serviceIconUrl={PromotionIcon}
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
                    serviceIconUrl={VideoProdIcon}
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
                    serviceIconUrl={MusicProd}
                    serviceOffers={[
                        "Composition & Arrangement",
                        "Recording & Sound Design",
                        "Mixing & Mastering",
                        "Jingles & Sonic Branding"
                    ]}
                    serviceLink="/services/music-production"
                />
            </div>

          <CTASection />
        </main> 
    </>
  )
}

interface ServiceCardProps {
  serviceTitle: string;
  serviceDescription: string;
  serviceIconUrl: string;
  serviceOffers: string[];
  serviceLink: string;
}



const ServiceCard = ({ serviceTitle, serviceDescription, serviceIconUrl, serviceOffers, serviceLink }: ServiceCardProps) => {
  return (
    <div className="px-20 py-27 text-sand bg-[#201F18] max-w-lg max-h-[650px]">
      <Image
        src={serviceIconUrl}
        alt={`${serviceTitle} icon`}
        width={64}
        height={64}
        className="mb-4"
      />
      <h2 className="text-xl font-bold mb-2 text-secondary">{serviceTitle}</h2>
      <p className="mb-4">{serviceDescription}</p>
      
      <ul className="space-y-5 pt-5">
        {serviceOffers.map((offer) => (
          <span key={offer} className='flex aling-center gap-2'> 
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M17.6667 8.57144V9.3381C17.6656 11.1351 17.0838 12.8837 16.0078 14.323C14.9318 15.7622 13.4194 16.8152 11.6961 17.3247C9.97286 17.8342 8.13105 17.773 6.44539 17.1503C4.75973 16.5275 3.32055 15.3765 2.34247 13.869C1.36439 12.3615 0.899826 10.5782 1.01806 8.78503C1.1363 6.99191 1.83101 5.28504 2.99857 3.919C4.16613 2.55295 5.74399 1.60092 7.49682 1.20489C9.24966 0.808861 11.0836 0.990051 12.725 1.72144M17.6667 2.67144L9.33334 11.0131L6.83334 8.5131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#F2CC0D"/>
            </svg>
            <li>{offer}</li>
          </span>
        ))}
      </ul>

      <a href={serviceLink} className="text-blue-500 hover:underline mt-8 inline-block">Learn More</a>
    </div>
  );
}; 