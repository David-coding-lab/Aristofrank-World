import Image from "next/image";
import Link from "next/link";

interface ArtistsCardProps {
  artistName: string;
  artistRoles: string;
  artistImage: string;
  artistLink?: string;
}

function ArtistsCard({
  artistName,
  artistRoles,
  artistImage,
  artistLink = "#",
}: ArtistsCardProps) {
  return (
    <Link
      href={artistLink}
      className="group flex w-full max-w-[385px] flex-col font-['Open_Sans']"
    >
      {/* Artist image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        <Image
          src={artistImage}
          alt={artistName}
          fill
          sizes="(min-width: 768px) 385px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Artist details */}
      <p className="mt-5 text-xl font-bold text-white">{artistName}</p>
      <p className="mt-1 text-base font-semibold text-neutral-400">
        {artistRoles}
      </p>
    </Link>
  );
}

export default ArtistsCard;
