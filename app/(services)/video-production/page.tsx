import Link from "next/link"
import { SiteHeader } from "@/components/features/layout/SiteHeader";
import { SiteFooter } from "@/components/features/layout/SiteFooter";
import Card from '@/components/features/video-production/Card'
import VideoPlayer from '@/components/features/video-production/VideoPlayer'
import VideoFrame from '@/components/features/video-production/VideoFrame.tsx'

function VideoProduction() {
  const BASE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample"

  const services = [
  {
    icon: "/ideabulb.png",
    title: "Concept Development",
    description:
      "We brainstorm and develop a powerful core idea that aligns with your brand's vision.",
  },
  {
    icon: "/Graph-Report.png",
    title: "Scriptwriting",
    description:
      "Crafting compelling narratives and bringing your story to life on screen.",
  },
  {
    icon: "/filming-icon.png",
    title: "Filming & Direction",
    description:
      "From shoot to final cut, we handle every detail to deliver polished, high-quality content.",
  },
  {
    icon: "/Scissors.png",
    title: "Editing & Post-Production",
    description:
      "Assembling footage, color grading, and sound mixing to create a polished final product.",
  },
  {
    icon: "/Sparkling.png",
    title: "Motion Graphics & VFX",
    description:
      "Adding stunning visual effects and animations to elevate the cinematic quality of your video.",
  },
  ]

  const videos = [
    {
      thumbnailUrl: `${BASE}/images/BigBuckBunny.jpg`,
      videoUrl: `${BASE}/BigBuckBunny.mp4`,
    },
    {
      thumbnailUrl: `${BASE}/images/BigBuckBunny.jpg`,
      videoUrl: `${BASE}/BigBuckBunny.mp4`,
    },
    {
      thumbnailUrl: `${BASE}/images/BigBuckBunny.jpg`,
      videoUrl: `${BASE}/BigBuckBunny.mp4`,
    },
    {
      thumbnailUrl: `${BASE}/images/BigBuckBunny.jpg`,
      videoUrl: `${BASE}/BigBuckBunny.mp4`,
    },
    {
      thumbnailUrl: `${BASE}/images/ElephantsDream.jpg`,
      videoUrl: `${BASE}/ElephantsDream.mp4`,
    },
    {
      thumbnailUrl: `${BASE}/images/Sintel.jpg`,
      videoUrl: `${BASE}/Sintel.mp4`,
    },
  ]
  return (
    <div className="bg-primary w-full h-fit">
      <SiteHeader />

        <section
            className="
                relative flex w-full items-center justify-center
                overflow-hidden bg-[#171611] bg-cover bg-center
                bg-no-repeat px-5 py-20 text-center
                sm:min-h-105 sm:py-24
                lg:min-h-180.75 lg:py-28
            "
            style={{
                backgroundImage: "url('/video-prod-bg.png')",
            }}
        >   
         {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/20"
          aria-hidden="true"
        />

       {/* Hero content */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
          <h1
            className="
              max-w-3xl font-['Open_Sans',sans-serif]
              text-3xl font-bold leading-tight text-white
              sm:text-4xl
              md:text-5xl
              lg:text-[60px] lg:leading-[1.35]
            "
          >
            Crafting Cinematic Legends
          </h1>

          <p
            className="
              mt-3 max-w-4xl font-['Open_Sans',sans-serif]
              text-base font-semibold leading-relaxed
              text-sand
              sm:mt-4 sm:text-lg
              md:text-xl
              lg:text-xl lg:leading-[1.4]
            "
          >
            We transform brands into visual masterpieces that captivate, inspire, and endure.
          </p>

            <Link
              href="/contact-us"
              className="
                mt-6 inline-flex w-full items-center justify-center
                rounded-md bg-accent px-5 py-3 text-center text-sm
                font-semibold text-[#171611]
                transition-colors hover:bg-white
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                sm:w-auto sm:px-6 sm:text-base
              "
            >
              Start Your Project
            </Link>
        </div>
    </section>

    <div className="w-full mx-auto max-w-7xl items-center text-center">
        <h1 className="font-['Open_Sans',sans-serif]
            text-3xl font-semibold leading-tight text-white
            sm:text-4xl
            md:text-5xl mt-30
            lg:text-[30px] lg:leading-[1.35]"
        >
            Our Process from Concept to Creation
        </h1>

        <section className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} {...service} />
          ))}
        </section>
    </div>
    <div className="relative z-10 mx-auto mt-20 flex w-full lg:px-0 px-10 max-w-4xl mb-10 flex-col items-center">
      <h1
        className="
          max-w-3xl font-['Open_Sans',sans-serif]
          text-[28px] font-bold leading-tight text-white
          sm:text-[32px]
          mb-8
          md:text-4xl md:leading-[1.3]
          lg:text-[40px] lg:leading-[1.35]
        "
      >
        See Our Work in Action
      </h1>

        <VideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        />

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
                videoUrl={video.videoUrl}
              />
            </div>
          ))}
        </div>
      </div>
      

    <SiteFooter />
    </div>
  )
}

export default VideoProduction