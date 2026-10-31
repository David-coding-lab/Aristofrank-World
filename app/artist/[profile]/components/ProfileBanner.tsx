"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface MusicBannerProps {
  artistName: string;
  artistDescription: string;
  artistImage: string;
  artistSongStyle: string;
}

function ProfileBanner({
  artistName,
  artistDescription,
  artistImage,
  artistSongStyle
}: MusicBannerProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-[#201F18] p-8 font-['Open_Sans'] md:flex-row md:gap-14">
      {/* Cover image */}
      <div className="relative aspect-[1.23/1] w-full shrink-0 overflow-hidden rounded-2xl md:w-[45%]">
        <Image
          src={artistImage}
          alt={artistName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <p className="text-xl md:text-lg font-semibold text-accent">
          {artistSongStyle}
        </p>

        <p className="mt-4 lg:text-4xl text-2xl font-bold text-white">
          {artistName}
        </p>

        <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-neutral-400">
          {artistDescription}
        </p>
      </div>
    </div>
  );
}

export default ProfileBanner;