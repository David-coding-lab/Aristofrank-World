import { SiteFooter } from "@/components/features/layout/SiteFooter";
import { SiteHeader } from "@/components/features/layout/SiteHeader"; 
import VideoContainer from "@/components/features/media/VideoContainer";
import HeroSection from "@/components/ui/HeroSection";
import NavLinks from "@/components/ui/NavLinks";

const videos = [
  {
    id: "1",
    videoTitle: "Aristofrank in Forbes: Redefining Brand Legacies",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1554200876-980213841c94?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1554200876-980213841c94?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "2",
    videoTitle: "Video: The Art of Legendary Branding",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1632860425102-996bc3c4a1f4?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1632860425102-996bc3c4a1f4?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "3",
    videoTitle: "Press Release: Announcing Our New Partnership",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1652819674544-a284366b1d0d?q=80&w=453&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1652819674544-a284366b1d0d?q=80&w=453&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "4",
    videoTitle: "Case Study: A Brand Reborn, From Bottom to Surface",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1554220201-4422cb484baa?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1554220201-4422cb484baa?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "5",
    videoTitle: "Behind the Scenes: A Legendary Campaign",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1711473610014-0505db6f6702?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1711473610014-0505db6f6702?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "6",
    videoTitle: "How We Crafted a Global Identity",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "7",
    videoTitle: "Video: Client Shoot in Studio, Sort Film",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "8",
    videoTitle: "Music Video: Client Shoot in Studio",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1603126004251-d01882b9bfd3?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1603126004251-d01882b9bfd3?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    id: "9",
    videoTitle: "Our Latest Creative Project",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1637250096679-c10f2751def8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    videoUrl: "https://images.unsplash.com/photo-1637250096679-c10f2751def8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
];

function Media() { 
  return ( 
    <div className='w-flex h-fit bg-primary pb-10'> 
      <SiteHeader /> 
      
      <HeroSection 
        HeroText="The Rich World Chronicle" 
        HeroSubText="Explore our features, insights, and legendary stories we’ve held create. witness the impact of visionary branding." 
      />

      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center gap-4 px-5 pt-5 pb-10 sm:mt-8 sm:flex-row sm:justify-center sm:gap-6 lg:mt-10">
        <NavLinks 
          links={["All", "News", "Opinion", "Culture"]}
          defaultActive="All"
        />
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <VideoContainer videos={videos} />
      </div>


      <SiteFooter />
      
    </div> 
  );
} 

export default Media;

