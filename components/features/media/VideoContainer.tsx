import LoadMoreVideos from "./LoadMoreVIdeos";

interface VideoItem {
  id: string;
  videoTitle: string;
  videoThumbnailUrl: string;
  videoUrl: string;
}

interface VideoContainerProps {
  videos: VideoItem[];
}

function VideoContainer({ videos }: VideoContainerProps) {

  return (
    <div className="flex flex-col gap-10">
        <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
            <LoadMoreVideos videos={videos} />
        </section>
    </div>
  );
}

export default VideoContainer;