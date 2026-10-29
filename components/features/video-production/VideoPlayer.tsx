"use client"

import { useEffect, useRef, useState } from "react"

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  className?: string
}

function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(autoPlay)

  // When mounted with autoPlay (e.g. after picking a video from the list), start right away
  useEffect(() => {
    if (!autoPlay) return
    videoRef.current?.play().catch(() => setStarted(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePlay = () => {
    setStarted(true)
    videoRef.current?.play()
  }

  return (
    <div
      className={`relative block aspect-video w-full min-w-0 max-w-full overflow-hidden rounded-xl bg-black sm:rounded-2xl ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={started}
        className={`absolute inset-0 h-full w-full ${
          started ? "object-contain" : "object-cover"
        }`}
        onEnded={() => setStarted(false)}
      />

      {!started && (
        <>
          {/* dark overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/60" />

          {/* play button */}
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F5CF0F] text-[#1D1B16] shadow-lg transition-transform hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:h-14 sm:w-14 md:h-16 md:w-16"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              aria-hidden="true"
              className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

export default VideoPlayer