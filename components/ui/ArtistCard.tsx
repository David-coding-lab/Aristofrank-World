import Link from 'next/link'

interface ArtistCardProps {
  artistName: string;
  artistSongStyle: string;
  profileLink: string;
  imageUrl: string;
}

const ArtistCard = ({
  artistName,
  artistSongStyle,
  profileLink,
  imageUrl,
}: ArtistCardProps) => {
  return (
    <div
      className="relative isolate flex aspect-[3/4] w-full 
        min-w-0 flex-col justify-end overflow-hidden rounded-xl 
        bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      {/* Bottom content */}
      <div className="p-5 sm:p-6">
        <h2 className="font-['Playfair_Display'] text-xl font-bold 
          leading-tight text-white sm:text-2xl">
          {artistName}
        </h2>

        <h4 className="mt-1 font-['Open_Sans'] text-sm font-medium 
          text-accent sm:text-base">
          {artistSongStyle}
        </h4>

        <Link
          href={profileLink}
          className="mt-4 inline-block font-['Open_Sans'] 
            text-xs font-bold uppercase tracking-wide text-white 
            transition-opacity hover:opacity-70 sm:text-sm"
        >
          VIEW PROFILE
        </Link>
      </div>
    </div>
  );
};

export default ArtistCard