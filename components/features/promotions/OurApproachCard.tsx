import Image from "next/image";

interface OurApproachCardProps {
  image: string;
  ourApproach: string;
  description: string;
}

function OurApproachCard({
  image,
  ourApproach,
  description,
}: OurApproachCardProps) {

  return (
    <div className="max-w-70 w-full rounded-xl border border-[#3A382C] bg-[#27251B] p-3 transition-colors duration-300 hover:border-[#4A4738]">
      <div className="mb-3 flex h-6 w-6 items-start text-start">
        <Image
          src={image}
          alt={ourApproach}
          width={40}
          height={40}
          aria-hidden="true"
          className="object-contain"
        />
      </div>

      <h3 className="mb-2 text-start text-base font-body font-medium leading-5 text-white">
        {ourApproach}
      </h3>

      <p className="text-sm text-start font-normal leading-5 text-[#908F8B]">
        {description}
      </p>
    </div>
  );
}

export default OurApproachCard;
