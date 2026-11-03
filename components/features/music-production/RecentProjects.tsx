"use client"

import { useState } from "react"
import TrackList, {
  type Track,
} from "@/components/features/music-production/TrackList"
import MusicPlayer from "@/components/features/music-production/MusicPlayer"
import type { TrackSummary } from "@/lib/content/types"

interface RecentProjectsProps {
  tracks: TrackSummary[]
}

export default function RecentProjects({ tracks }: RecentProjectsProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  const playerTracks: Track[] = tracks.map((track) => ({
    id: track.id,
    title: track.title,
    artist: track.artistName,
    cover: track.coverUrl,
    duration: track.duration,
  }))

  if (playerTracks.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 pb-10 text-sm text-sand">
        No tracks have been published yet.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl mb-20">
      <MusicPlayer
        track={currentTrack}
        progress={35}
        onClose={() => setCurrentTrack(null)}
      />
      <TrackList tracks={playerTracks} onSelectTrack={setCurrentTrack} />
    </div>
  )
}
