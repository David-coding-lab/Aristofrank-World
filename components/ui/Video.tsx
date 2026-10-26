import Link from "next/link";

interface VideoProps {
    videoUrl: string;
    videoTitle: string;
    videoThumbnailUrl: string;
}

function Video({ videoTitle, videoThumbnailUrl, videoUrl }: VideoProps) {
  return (
    <div
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#201F18]"
      style={{
        backgroundImage: `url('${videoThumbnailUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <Link href={videoUrl} target="_blank" rel="noopener noreferrer">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] transition-colors duration-300 group-hover:bg-[rgba(0,0,0,0.4)]" />

            {/* Video title */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
                <h3 className="font-['Open_Sans'] text-sm font-medium leading-snug text-white sm:text-base lg:text-md">
                    {videoTitle}
                </h3>
            </div>
        </Link>
    </div>
  );
}

export default Video;
