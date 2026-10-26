
import Image from "next/image";

interface CreativeCardsProps {
  designDescription: string;
  designImgUrl: string;
  designTitle: string;
}

function CreativeCards({
  designDescription,
  designImgUrl,
  designTitle,
}: CreativeCardsProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-[#1A1814]">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={designImgUrl}
          alt={designTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-9">
        <h3
          className="font-['Open_Sans',sans-serif]
            text-2xl font-semibold leading-tight text-white
            sm:text-3xl lg:text-2xl text-start"
        >
          {designTitle}
        </h3>

        <p
          className="mt-5 max-w-4xl font-['Open_Sans',sans-serif]
            text-base font-semibold leading-relaxed text-sand
            sm:mt-6 sm:text-lg lg:text-md text-start"
        >
          {designDescription}
        </p>
      </div>
    </div>
  );
}

export default CreativeCards;
