"use client";

import { useState } from "react";
import Image from "next/image";

export interface Track {
  id: string | number;
  title: string;
  artist: string;
  cover: string;
  duration: string; // e.g. "3:00"
}

interface TrackRowProps {
  track: Track;
  onSelect?: (track: Track) => void;
}

function TrackRow({ track, onSelect }: TrackRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(track)}
      aria-label={`Play ${track.title} by ${track.artist}`}
      className="group flex w-full items-center gap-3 rounded-xl text-left transition hover:bg-white/5"
    >
      {/* Cover art */}
        <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-xl">
            <Image
                src={track.cover}
                alt={track.title}
                fill
                sizes="80px"
                className="object-cover"
            />

            {/* Play overlay */}
             <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span
                    className="material-symbols-outlined !text-[40px] text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    play_arrow
                </span>
            </div>
        </div>
        <div className="flex justify-between w-full">
            <div className="flex-row fotn-bold text-lg">

            <p className="text-secondary">&ldquo;{track.title}&rdquo;</p>

            {/* Artist */}
            <p className="flex-1 text-sm mt-2 font-bold text-[#A8A28A] transition group-hover:text-white">
                {track.artist}
            </p>
            </div>

            {/* Duration */}
            <p className="pr-2 text-base font-bold text-[#A8A28A]">
                {track.duration}
            </p>
        </div>
    </button>
  );
}

interface TrackListProps {
  tracks: Track[];
  initialCount?: number;
  step?: number;
  onSelectTrack?: (track: Track) => void;
}

function TrackList({
  tracks,
  initialCount = 3,
  step = 3,
  onSelectTrack,
}: TrackListProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const hasMore = visibleCount < tracks.length;

  return (
    <div className="flex w-full flex-col font-['Open_Sans']">
      <div className="flex flex-col gap-7">
        {tracks.slice(0, visibleCount).map((track) => (
          <TrackRow key={track.id} track={track} onSelect={onSelectTrack} />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + step)}
          className="mx-auto mt-8 rounded-full border border-accent px-10 py-3.5 text-sm font-bold text-accent transition hover:bg-accent hover:text-black"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default TrackList;