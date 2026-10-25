import { SiteHeader } from "@/components/features/layout/SiteHeader"; 
import HeroSection from "@/components/ui/HeroSection";
import NavLinks from "@/components/ui/NavLinks";

function Media() { 
  return ( 
    <div className='w-flex h-screen bg-primary pb-10'> 
      <SiteHeader /> 
      
      <HeroSection 
        HeroText="The Rich World Chronicle" 
        HeroSubText="Explore our features, insights, and legendary stories we’ve held create. witness the impact of visionary branding." 
      />

      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center gap-4 px-5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-6 lg:mt-10">
        <NavLinks 
          links={["All", "News", "Opinion", "Culture"]}
          defaultActive="All"
        />
      </div>
      
    </div> 
  );
} 

export default Media;

