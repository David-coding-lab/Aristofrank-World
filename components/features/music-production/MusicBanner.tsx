"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface MusicBannerProps {
  songName: string;
  songDescription: string;
  songPlayLink: string;
  songImage: string;
}

function MusicBanner({
  songName,
  songDescription,
  songPlayLink,
  songImage,
}: MusicBannerProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-[#201F18] p-8 font-['Open_Sans'] md:flex-row md:gap-14">
      {/* Cover image */}
      <div className="relative aspect-[1.23/1] w-full shrink-0 overflow-hidden rounded-2xl md:w-[45%]">
        <Image
          src={songImage}
          alt={songName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <p className="text-xl md:text-lg font-semibold text-accent">
          Featured Production
        </p>

        <p className="mt-4 lg:text-4xl text-2xl font-bold text-white">
          &ldquo;{songName}&rdquo;
        </p>

        <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-neutral-400">
          {songDescription}
        </p>

        <div className="mt-12 flex items-center gap-6">
          <Link
            href={songPlayLink}
            className="flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            <span className="material-symbols-outlined !text-[18px]">
              play_arrow
            </span>
            Play Now
          </Link>

          {/* like icon */}
          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            aria-label={liked ? "Unlike" : "Like"}
            aria-pressed={liked}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-neutral-500 text-white transition hover:border-white"
          >
            <span
              className={`material-symbols-outlined ${
                liked ? "text-accent" : ""
              }`}
              style={{ fontVariationSettings: `'FILL' ${liked ? 1 : 1}` }}
            >
              favorite
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicBanner;