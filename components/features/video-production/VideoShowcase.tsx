"use client"

import { useRef, useState } from "react"
import VideoPlayer from "./VideoPlayer"
import VideoFrame from "./VideoFrame"

interface VideoItem {
  thumbnailUrl: string
  videoUrl: string
  title?: string
}

interface VideoShowcaseProps {
  videos: VideoItem[]
}

function VideoShowcase({ videos }: VideoShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)

  const selected = videos[selectedIndex]
  if (!selected) return null

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    setAutoPlay(true)
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div ref={playerRef} className="w-full scroll-mt-24">
        {/* key remounts the player so the new video loads and plays fresh */}
        <VideoPlayer
          key={selectedIndex}
          src={selected.videoUrl}
          poster={selected.thumbnailUrl}
          autoPlay={autoPlay}
        />
      </div>

      <div
        className="
          mt-10 flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto
          px-4 pb-4
          [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          sm:gap-6 sm:px-8
        "
      >
        {videos.map((video, index) => (
          <div
            key={`${video.videoUrl}-${index}`}
            className="w-[80vw] max-w-[400px] shrink-0 snap-start sm:w-[400px]"
          >
            <VideoFrame
              thumbnailUrl={video.thumbnailUrl}
              title={video.title ?? `Play video ${index + 1}`}
              isActive={index === selectedIndex}
              onSelect={() => handleSelect(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoShowcase