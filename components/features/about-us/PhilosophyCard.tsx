
import Image from "next/image";

interface CardProps {
  iconUrl: string;
  cardTitle: string;
  cardDescription: string;
}

function PhilosophyCard({
  iconUrl,
  cardTitle,
  cardDescription,
}: CardProps) {
  return (
    <div
      className="flex w-full flex-col items-center rounded-2xl
        bg-[#1D1B16] px-6 py-8 text-center
        sm:px-10 sm:py-8 lg:px-12 lg:py-8"
    >
      {/* Icon */}
      <div className="relative mb-10 h-20 w-20 sm:mb-12 sm:h-24 sm:w-24">
        <Image
          src={iconUrl}
          alt=""
          fill
          sizes="96px"
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className="font-['Open_Sans',sans-serif] text-2xl
          font-bold leading-tight text-white
          sm:text-3xl lg:text-2xl"
      >
        {cardTitle}
      </h3>

      {/* Description */}
      <p
        className="mt-8 max-w-xl font-['Open_Sans',sans-serif]
          text-base font-semibold leading-relaxed text-sand
          sm:mt-12 sm:text-lg
          lg:text-[18px] lg:leading-[1.35]"
      >
        {cardDescription}
      </p>
    </div>
  );
}

export default PhilosophyCard;
