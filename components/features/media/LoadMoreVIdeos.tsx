
"use client";

import { useState } from "react";
import Video from "@/components/ui/Video";

interface VideoItem {
  id: string;
  videoTitle: string;
  videoThumbnailUrl: string;
  videoUrl: string;
}

interface LoadMoreVideosProps {
  videos: VideoItem[];
}

export default function LoadMoreVideos({
  videos,
}: LoadMoreVideosProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
        {videos.slice(0, visibleCount).map((video) => (
          <Video
            key={video.id}
            videoTitle={video.videoTitle}
            videoThumbnailUrl={video.videoThumbnailUrl}
            videoUrl={video.videoUrl}
          />
        ))}
      </div>

      {visibleCount < videos.length && (
        <button
          type="button"
          onClick={() =>
            setVisibleCount((previous) => previous + 6)
          }
          className="self-center rounded-md bg-[#393628] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a4736]"
        >
          Load More
        </button>
      )}
    </div>
  );
}
