
"use client";

import { useState } from "react";
import ArtistCard from "@/components/ui/ArtistCard";
import type { ArtistSummary } from "@/lib/content/types";

interface LoadMoreArtistsProps {
  artists: ArtistSummary[];
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
            artistName={artist.name}
            artistSongStyle={artist.genre.join(", ")}
            profileLink={artist.profileUrl}
            imageUrl={artist.profileImage}
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
