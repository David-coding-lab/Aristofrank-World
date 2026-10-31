import Image from 'next/image'

interface VideoFrameProps {
  thumbnailUrl: string
  onSelect: () => void
  isActive?: boolean
  title?: string
  className?: string
}

function VideoFrame({
  thumbnailUrl,
  onSelect,
  isActive = false,
  title = "Play video",
  className = "",
}: VideoFrameProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={title}
      aria-pressed={isActive}
      className={`group relative block aspect-[8/5] w-full min-w-0 max-w-full cursor-pointer overflow-hidden rounded-2xl bg-black focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 ${
        isActive ? "ring-2 ring-[#F5CF0F]" : ""
      } ${className}`}
    >
      <Image
        src={thumbnailUrl}
        width={20}
        height={20}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* hover overlay + play icon */}
      <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30 group-focus-visible:bg-black/30">
        <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-[#F5CF0F] text-[#1D1B16] opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 sm:h-14 sm:w-14">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            aria-hidden="true"
            className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6"
          >
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
        </span>
      </span>
    </button>
  )
}

export default VideoFrame