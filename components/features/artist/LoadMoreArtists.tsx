
"use client";

import { useState } from "react";
import ArtistCard from "@/components/ui/ArtistCard";

interface Artist {
  id: string;
  artistName: string;
  artistSongStyle: string;
  profileLink: string;
  imageUrl: string;
}

interface LoadMoreArtistsProps {
  artists: Artist[];
}

export default function LoadMoreArtists({
  artists,
}: LoadMoreArtistsProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <div className="flex flex-col gap-10">
      <div
        className="mx-auto grid w-full max-w-7xl
          grid-cols-[repeat(auto-fill,minmax(min(100%,250px),280px))]
          justify-center gap-4 px-4 sm:px-6 lg:px-8"
      >
        {artists.slice(0, visibleCount).map((artist) => (
          <ArtistCard
            key={artist.id}
            artistName={artist.artistName}
            artistSongStyle={artist.artistSongStyle}
            profileLink={artist.profileLink}
            imageUrl={artist.imageUrl}
          />
        ))}
      </div>

      {visibleCount < artists.length && (
        <button
          type="button"
          onClick={() =>
            setVisibleCount((previous) => previous + 6)
          }
          className="self-center rounded-md bg-[#393628] px-6 py-3
            text-sm font-medium text-white transition-colors
            hover:bg-[#4a4736]"
        >
          Load More
        </button>
      )}
    </div>
  );
}
