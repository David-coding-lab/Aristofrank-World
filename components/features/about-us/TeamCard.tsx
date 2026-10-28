import Image from "next/image";

interface TeamCardProps {
  imageUrl: string;
  name: string;
  role: string;
  description: string;
}

const TeamCard = ({ imageUrl, name, role, description }: TeamCardProps) => {
  return (
    <div className="flex w-full max-w-sm flex-col items-center bg-[#201F18] px-6 py-8 text-center font-['Open_Sans']">
      <Image
        alt={name}
        src={imageUrl}
        width={200}
        height={200}
        className="size-32 rounded-full object-cover"
      />

      <p className="mt-6 text-2xl font-bold text-secondary">{name}</p>

      <p className="mt-2 text-sm font-bold text-accent">{role}</p>

      <p className="mt-6 max-w-xs text-base font-semibold leading-snug text-[#ACA790]">
        {description}
      </p>
    </div>
  );
};

export default TeamCard;