import Image from "next/image"

interface ProfileBannerProps {
  artistName: string
  artistDescription: string
  artistImage: string
  artistSongStyle: string
}

function ProfileBanner({
  artistName,
  artistDescription,
  artistImage,
  artistSongStyle,
}: ProfileBannerProps) {
  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-[#201F18] p-8 font-['Open_Sans'] md:flex-row md:gap-14">
      <div className="relative aspect-[1.23/1] w-full shrink-0 overflow-hidden rounded-2xl md:w-[45%]">
        <Image
          src={artistImage}
          alt={`${artistName} — ${artistSongStyle}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-xl md:text-lg font-semibold text-accent">
          {artistSongStyle}
        </p>

        <h1 className="mt-4 lg:text-4xl text-2xl font-bold text-white">
          {artistName}
        </h1>

        <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-neutral-400">
          {artistDescription}
        </p>
      </div>
    </div>
  )
}

export default ProfileBanner
