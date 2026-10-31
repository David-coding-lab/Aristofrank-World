"use client";

import Image from "next/image";
import type { Track } from "./TrackList";

interface MusicPlayerProps {
  track: Track | null;
  isPlaying?: boolean;
  progress?: number; // 0 - 100
  onTogglePlay?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
}

function MusicPlayer({
  track,
  isPlaying = true,
  progress = 0,
  onTogglePlay,
  onPrev,
  onNext,
  onClose,
}: MusicPlayerProps) {
  if (!track) return null;

  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="
        fixed z-50 font-['Open_Sans']
        inset-x-3 bottom-3
        sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[420px]
      "
    >
      <div className="rounded-2xl bg-[#1A1913] p-5 shadow-2xl shadow-black/50 ring-1 ring-white/5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-serif text-lg font-bold text-white sm:text-xl">
            Playing now
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close player"
            className="flex rounded-full p-1 text-[#A8A28A] transition hover:bg-white/10 hover:text-white"
          >
            <span className="material-symbols-outlined !text-[22px]">
              close
            </span>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-4">
          {/* Cover with play / pause toggle */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-[72px] sm:w-[72px]"
          >
            <Image
              src={track.cover}
              alt={track.title}
              fill
              sizes="72px"
              className={`object-cover ${
                isPlaying ? "animate-[spin_12s_linear_infinite]" : ""
              }`}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/50">
              <span
                className="material-symbols-outlined !text-[32px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </span>
          </button>

          {/* Info + progress */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-white sm:text-xl">
                  {track.title}
                </p>
                <p className="mt-1 truncate text-xs font-bold text-[#A8A28A]">
                  {track.artist}
                </p>
              </div>

              {/* Prev / Next */}
              <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous track"
                  className="flex text-white transition hover:text-accent"
                >
                  <span className="material-symbols-outlined !text-[32px]">
                    keyboard_double_arrow_left
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next track"
                  className="flex text-white transition hover:text-accent"
                >
                  <span className="material-symbols-outlined !text-[32px]">
                    keyboard_double_arrow_right
                  </span>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(safeProgress)}
              className="mt-3 h-[3px] w-full overflow-hidden bg-white"
            >
              <div
                className="h-full bg-accent"
                style={{ width: `${safeProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;